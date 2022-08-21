import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusinessId, ConfigService, imagesPathUrl, ToasterService } from '@shared';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../../category/category.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  loading:boolean = false;
  filePath:String;
  productImage:any;
  productForm:FormGroup;
  categoryList:any;
  selectedCategoryId:number = 0;
  selectedProductId:number = 0;
  isEditProduct:boolean = false;
  selectizeConfig:any;
  categorySelectizeConfig:any;
  selections:any;
  constructor(private productService:ProductsService, private CategoryService: CategoryService,
    private toasterService:ToasterService,
    private activatedRoute: ActivatedRoute,
    private configService:ConfigService) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.selectedCategoryId = params['CategoryId'];
        this.selectedProductId = params['productId'];
        this.isEditProduct = this.selectedProductId > -1;
        if(this.selectedProductId)
          this.getProductById();
      });

    this.selectizeConfig = this.configService.getSelectizeConfig();
    this.categorySelectizeConfig = this.configService.getSelectizeConfig(1);
    this.getTheListOfCategories();
    this.getListOfSelections();

  }

  ngOnInit(): void {
    this.initlizeProductForm();
  }

  initlizeProductForm():void {
    this.productForm = new FormGroup({
      productId: new FormControl(Number(this.selectedProductId)),
      businessId: new FormControl(Number(BusinessId)),
      selectionId:  new FormControl([]),
      productName: new FormControl("",Validators.required),
      categoryId: new FormControl(this.selectedCategoryId ? this.selectedCategoryId: 0,Validators.required),
      productDescription: new FormControl(""),
      productImage: new FormControl(""),
      productVariants: new FormControl([]),
      productTablePrice: new FormControl(0),
      productTableVat: new FormControl(0),
      productPickupPrice: new FormControl(0),
      productPickupVat: new FormControl(0),
      productDeliveryPrice: new FormControl(0),
      productDeliveryVat: new FormControl(0),
      productSortBy: new FormControl(0),
      productQuantity: new FormControl(0),
      hasVariations: new FormControl(false),
      featured: new FormControl(false),
      isDeleted: new FormControl(false),
      active: new FormControl(true),
    })
  }

  onProductAdd() {
    this.loading = true;
    if(this.isEditProduct) {
      this.productService.updateProduct(this.productForm.value).pipe(finalize(() => {
        if(this.productImage) this.onImageUpload();
      })).subscribe(response => {
        if(response && response.message && response.message.length > 0)
          this.toasterService.error(response.message)
        else
          this.toasterService.success("Product updated!")
        this.loading = false;
      }, error => {
        console.log(error)
        this.loading = false;
        this.toasterService.error(error)
      })
    } else {
      this.productService.addNewProduct(this.productForm.value).pipe(finalize(() => {
        if(this.productImage) this.onImageUpload();
      })).subscribe(response => {
        if(response && response.message && response.message.length > 0)
          this.toasterService.error(response.message)
        else
          this.toasterService.success("Product created!")
        this.loading = false;
      }, error => {
        console.log(error)
        this.loading = false;
        this.toasterService.error(error)
      })
    }
  }

  getTheListOfCategories(){
    this.CategoryService.getCategoriesSelectize().subscribe(response => {
      this.categoryList = response;
    },error => console.log(error));
  }

  getProductById(){
    this.productService.getProductById(this.selectedProductId).subscribe(response => {
      this.filePath = `${imagesPathUrl}/Images/${response.productImage}`
      this.productForm.patchValue(response);
      },error => {
        console.log(error)
        this.toasterService.error(error)
      })
  }

  getListOfSelections(){
    this.productService.getListOfSelections().subscribe(response => {
      this.selections = response;
    })
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.productImage = file;
    this.productForm.patchValue({
      productImage:file.name
    })
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  onImageUpload(): void {
    const formData = new FormData();
    formData.append('file', this.productImage, this.productImage.name);
    this.productService.updateProductImage(formData).subscribe(response => {
      this.loading = false;
    }, error => {
      console.log(error)
      this.loading = false;
      this.toasterService.error(error)
    })
  }

}

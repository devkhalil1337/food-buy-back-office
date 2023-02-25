import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  isVariantExsits:boolean = false;

  get VariationsArray():FormArray{
    return <FormArray> this.productForm.get('productVariants');
  }



  constructor(private productService:ProductsService, private CategoryService: CategoryService,
    private toasterService:ToasterService,
    private activatedRoute: ActivatedRoute,
    private configService:ConfigService,
    private fb: FormBuilder) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.selectedCategoryId = Number(params['CategoryId'])
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
    this.productForm = this.fb.group({
      productId: new FormControl(Number(this.selectedProductId)),
      businessId: new FormControl(Number(BusinessId)),
      selectionId:  new FormControl([]),
      productName: new FormControl(""),
      categoryId: new FormControl(this.selectedCategoryId ? Number(this.selectedCategoryId): 0,Validators.required),
      productDescription: new FormControl(""),
      productImage: new FormControl(""),
      isTableProduct: new FormControl(false),
      tablePrice: new FormControl(0),
      tableVat: new FormControl(0),
      isPickupProduct: new FormControl(false),
      pickupPrice: new FormControl(0),
      pickupVat: new FormControl(0),
      isDeliveryProduct: new FormControl(false),
      deliveryPrice: new FormControl(0),
      deliveryVat: new FormControl(0),
      hasVariations: new FormControl(false),
      featured: new FormControl(false),
      productSortBy: new FormControl(0),
      productQuantity: new FormControl(0),
      isDeleted: new FormControl(false),
      active: new FormControl(true),
      productVariants:this.fb.array([])
    })
  }

  onProductAdd() {
    this.loading = true;
    this.checkIfVariantionExisits();
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

      if(response && response.productVariants && response.productVariants.length > 0){
        this.isVariantExsits = true;
        response.productVariants.forEach(element => {
          this.addMoreFields();
        });
      }

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

  onAddVaritians(){
    
    if(this.VariationsArray.value && this.VariationsArray.value.length > 0)
      this.isVariantExsits = true;
    else
      this.isVariantExsits = !this.isVariantExsits;

    this.addMoreFields();

    console.log(this.VariationsArray.value);
  }


  addMoreFields() {
    this.VariationsArray.push(this.onAddMoreModifiers());
  }

  onAddMoreModifiers():FormGroup{
    return this.fb.group({
      variantId:null,
      variationName:null,
      variationPrice:null,
      isDeleted:false,
      Active:true,
    })
  }
  onRemoveModifer(index:number){
    (this.productForm.get('productVariants') as FormArray).controls[index].patchValue({
      isDeleted:true
    });
    if(this.productForm.get('productVariants').value.every(elm => elm.isDeleted))
      this.isVariantExsits = false;
    // (this.productForm.get('productVariants') as FormArray).removeAt(index);
  }


  checkIfVariantionExisits(){
    if(this.VariationsArray.value && this.VariationsArray.value.length > 0){
      console.log(this.VariationsArray.value);
      let _varProduct = this.VariationsArray.value.filter(elm => elm.variationName && !elm.isDeleted)
      if(_varProduct && _varProduct.length > 0)
        _varProduct = _varProduct[0];
      else  
        return;
      this.productForm.patchValue({
        productName:_varProduct.variationName,
        productDeliveryPrice:_varProduct.variationPrice
      })
    }
  }


}

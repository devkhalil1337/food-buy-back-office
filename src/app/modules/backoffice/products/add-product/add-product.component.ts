import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BusinessId, ToasterService } from '@shared';
import { CategoryService } from '../../category/category.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  filePath:string;
  productForm:FormGroup;
  categoryList:any;
  selectedCategoryId:number = 0;
  selectedProductId:number = 0;
  isEditProduct:boolean = false;
  constructor(private productService:ProductsService, private CategoryService: CategoryService,
    private toasterService:ToasterService,
    private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.selectedCategoryId = params['CategoryId'];
        this.selectedProductId = params['productId'];
        this.isEditProduct = this.selectedProductId > -1;
        if(this.selectedProductId)
          this.getProductById();
      });


    this.getTheListOfCategories();

  }

  ngOnInit(): void {
    this.initlizeProductForm();
  }

  initlizeProductForm():void {
    this.productForm = new FormGroup({
      productId: new FormControl(Number(this.selectedProductId)),
      businessId: new FormControl(Number(BusinessId)),
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

  onProductAdd(){
    if(this.isEditProduct){
      this.productService.updateProduct(this.productForm.value).subscribe(response => {
        this.toasterService.success("Product Updated")
        },error => {
          console.log(error)
          this.toasterService.error(error)
        })
    }else{
      this.productService.addNewProduct(this.productForm.value).subscribe(response => {
        this.toasterService.success("Product created")
        },error => {
          console.log(error)
          this.toasterService.error(error)
        })
    }
  }

  getTheListOfCategories(){
    this.CategoryService.getListOfCategories().subscribe(response => {
      this.categoryList = response;
      console.log(response);
    },error => console.log(error));
  }

  getProductById(){
    this.productService.getProductById(this.selectedProductId).subscribe(response => {
      console.log(response);
      this.productForm.patchValue(response);
      },error => {
        console.log(error)
        this.toasterService.error(error)
      })
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  filePath:string;
  productForm:FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initlizeProductForm();
  }

  initlizeProductForm():void {
    this.productForm = new FormGroup({
      productName: new FormControl("",Validators.required),
      cateId: new FormControl(0,Validators.required),
      productPrice: new FormControl("",Validators.required),
      productDescription: new FormControl(""),
      productImage: new FormControl(""),
      productStatus: new FormControl(true),
      productFeature: new FormControl(false),
    })
  }

  onProductAdd(){
    console.log(this.productForm.value);
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

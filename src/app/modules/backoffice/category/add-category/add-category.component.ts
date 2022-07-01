import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


  categoryForm:FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl("",Validators.required),
      categoryDetails: new FormControl(""),
      categorySortBy : new FormControl("",[Validators.required,Validators.min(0)]),
      CreationDate :new FormControl(""),
      active: new FormControl("1",Validators.required)
    })
  }


  onSubmit(){
    console.log(this.categoryForm.value);
  }

}

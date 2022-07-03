import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/modules/core';
import { FormatterService } from 'src/app/modules/shared/format.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


  categoryForm:FormGroup;
  
  constructor(private categoryService:CategoryService, private formatterServoce:FormatterService) { 
    this.categoryForm = new FormGroup({
    categoryName: new FormControl("",Validators.required),
      categoryImage: new FormControl(""),
      categoryDetails: new FormControl(""),
      categorySortBy : new FormControl(1),
      active: new FormControl(true),
      isDeleted: new FormControl(false),
      businessId: new FormControl(0)
     })
  }

  ngOnInit(): void {
  }


  onSubmit(){
    let category = new Category(this.categoryForm.value)
    this.categoryService.onCreateCategory(category).subscribe(response => {
      console.log(response);
    },error => console.log(error))
  }

}

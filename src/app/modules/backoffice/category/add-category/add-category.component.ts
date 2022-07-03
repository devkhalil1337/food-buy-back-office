import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/modules/core';
import { ToasterService } from 'src/app/modules/shared';
import { FormatterService } from 'src/app/modules/shared/format.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


  categoryForm:FormGroup;
  selectedCategoryId:number;
  constructor(private categoryService:CategoryService, 
    private formatterServoce:FormatterService,
    private activatedRoute: ActivatedRoute,
    private toasterService:ToasterService) { 
      this.activatedRoute.queryParams.subscribe(params => {
        this.selectedCategoryId = params['CategoryId'];
      });



    this.categoryForm = new FormGroup({
      categoryId: new FormControl(null),
      categoryName: new FormControl("",Validators.required),
      categoryImage: new FormControl(""),
      categoryDetails: new FormControl(""),
      categorySortBy : new FormControl(1),
      active: new FormControl(1),
      isDeleted: new FormControl(false),
      businessId: new FormControl(0)
     });

     if(this.selectedCategoryId){
       this.categoryService.getCategoryById(this.selectedCategoryId).subscribe(response => {
        this.categoryForm.patchValue(new Category(response));
      });
     }


  }

  ngOnInit(): void {
  }


  onSubmit(){
    let category = new Category(this.categoryForm.value);
    if(this.selectedCategoryId){
      this.categoryService.onUpdateCategory(category).subscribe(response => {
        console.log(response);
        this.toasterService.success("category updated")
      },error => {
        console.log(error)
        this.toasterService.error(error)
      })
    }else{
      this.categoryService.onCreateCategory(category).subscribe(response => {
        console.log(response);
        this.toasterService.success("category created")
      },error => {
        console.log(error)
        this.toasterService.error(error)
      })
    }
  }

}

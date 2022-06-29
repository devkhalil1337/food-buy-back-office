import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { choiceGroupsItems } from 'src/app/models/choice-groups.models';

@Component({
  selector: 'app-add-choice',
  templateUrl: './add-choice.component.html',
  styleUrls: ['./add-choice.component.scss']
})
export class AddChoiceComponent implements OnInit {

  selectedChoiceId:number;  
  selectedSelection:any
  get ModifersArray():FormArray{
    return <FormArray> this.ChoiceForm.get('modifiers');
  }

  ChoiceForm: FormGroup;

  constructor(private fb: FormBuilder,private activeRoute: ActivatedRoute) { 
    this.activeRoute.queryParams.subscribe((queryParams) => {
      this.selectedChoiceId = queryParams['choiceId']
      console.log('Get Router Params:', this.selectedChoiceId);
      this.selectedSelection = choiceGroupsItems.filter(elm => elm.id == this.selectedChoiceId)[0];
      this.ChoiceForm = this.fb.group({
          choiceName: [null, [Validators.required]],
          miniAllowed: [1],
          maxAllowed: [1],
          modifiers:this.fb.array([this.onAddMoreModifiers()],Validators.required)
        })

    });
  }

  ngOnInit(): void {

    if(this.selectedChoiceId){
      this.selectedSelection.modifiers.forEach((element,index,array) => {
        this.addMoreFields();
        if(index == array.length -1 )
          this.onRemoveModifer(index);
      });
      this.ChoiceForm.patchValue({
        choiceName: this.selectedSelection.selectName,
        miniAllowed:  this.selectedSelection.mini,
        maxAllowed:  this.selectedSelection.max,
        modifiers: [...this.selectedSelection.modifiers]
      });
    }

  }

  OnAddChoice() {

    console.log(this.ChoiceForm);

  }


  addMoreFields() {
    this.ModifersArray.push(this.onAddMoreModifiers());
  }

  onAddMoreModifiers():FormGroup{
    return this.fb.group({
      modifierName:[null,Validators.required],
      price:[null,Validators.required]
    })
  }

  onRemoveModifer(index:number){
    if(index == 0)
      return;
    (this.ChoiceForm.get('modifiers') as FormArray).removeAt(index);
  }

}

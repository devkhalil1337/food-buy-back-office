import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-choice',
  templateUrl: './add-choice.component.html',
  styleUrls: ['./add-choice.component.scss']
})
export class AddChoiceComponent implements OnInit {


  get ModifersArray():FormArray{
    return <FormArray> this.ChoiceForm.get('modifiers');
  }

  ChoiceForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ChoiceForm = this.fb.group(
      {
        choiceName: [null, [Validators.required]],
        miniAllowed: [1],
        maxAllowed: [1],
        modifiers:this.fb.array([this.onAddMoreModifiers()],Validators.required)
      }
    )
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

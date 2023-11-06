import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, ToasterService } from 'src/app/modules/shared';
import { ChoiceGroupsService } from '../choice-groups.service';

@Component({
  selector: 'app-add-choice',
  templateUrl: './add-choice.component.html',
  styleUrls: ['./add-choice.component.scss']
})
export class AddChoiceComponent implements OnInit {

  loading: boolean = false;
  selectedChoiceId: number;
  selectedSelection: any
  get ModifersArray(): FormArray {
    return <FormArray>this.ChoiceForm.get('selectionChoices');
  }

  ChoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private choiceOfGroupServices: ChoiceGroupsService,
    private toasterService: ToasterService, private configService: ConfigService) {
    this.ChoiceForm = this.fb.group({
      selectionId: this.selectedChoiceId ? this.selectedChoiceId : null,
      businessId: [this.configService.businessId],
      selectionName: [null, [Validators.required]],
      minimumSelection: [1],
      maximumSelection: [1],
      active: [true],
      isDeleted: [false],
      selectionChoices: this.fb.array([])
    })
    this.onRouteActivateSubscribe();

  }

  ngOnInit(): void { }

  OnAddChoice() {
    this.loading = true;
    if (this.selectedChoiceId) {
      this.choiceOfGroupServices.onUpdateSelection(this.ChoiceForm.value).subscribe(response => {
        if (response && response.success)
          this.toasterService.success("Product has been updated")
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
        this.toasterService.error(error)
      })
    } else {
      this.choiceOfGroupServices.onAddEditSelection(this.ChoiceForm.value).subscribe(response => {
        if (response && response.success)
          this.toasterService.success("Product has been added")
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.loading = false;
        this.toasterService.error(error)
      })
    }
  }


  addMoreFields() {
    this.ModifersArray.push(this.onAddMoreModifiers());
  }

  onAddMoreModifiers(): FormGroup {
    return this.fb.group({
      choicesId: null,
      choiceName: null,
      choicePrice: null,
      choiceSortedBy: 0,
      isDeleted: false
    })
  }

  onRemoveModifer(index: number) {
    (this.ChoiceForm.get('selectionChoices') as FormArray).controls[index].patchValue({
      isDeleted: true
    });
    // (this.ChoiceForm.get('selectionChoices') as FormArray).removeAt(index);
  }


  onRouteActivateSubscribe() {
    this.activeRoute.queryParams.subscribe((queryParams) => {
      this.selectedChoiceId = queryParams['choiceId']
      if (this.selectedChoiceId) {
        this.choiceOfGroupServices.getSelectionById(this.selectedChoiceId).subscribe(response => {
          response.selectionChoices.forEach((element, index, array) => {
            this.addMoreFields();
            if (index == array.length - 1)
              this.onRemoveModifer(index);
          });
          this.ChoiceForm.patchValue(response);
        })
      } else {
        this.addMoreFields();
      }
    });

  }

}

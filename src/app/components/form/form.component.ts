import { Component, OnInit, Input } from '@angular/core';
import FormModel from '../../models/formModel';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formSettings: FormModel[];
  @Input() submitBtnName: string;
  @Input() submitFunction: Function;
  @Input() isDoingRequest = false;

  constructor(private formService: FormService) {
    this.submitBtnName = 'Zapisz';
  }

  formStateItems: any[] = [];
  currentFocusedInput: number = -1;
  showListWithErrorsCounters: boolean = false;
  numberOfFormItems: number = 0;
  isFormReadyToSubmit: boolean = false;
  shouldShowErrorsSpecifications: boolean = false;
  errorsSpecifications: any[] = [];

  ngOnInit() {
    this.formStateItems = this.formService.createFormItems(this.formSettings);
    this.numberOfFormItems = this.formSettings.length;
    console.log(this.formStateItems);
  }

  fillErrorsOnFocusedInput(index: number) {
    this.currentFocusedInput = index;
    this.showListWithErrorsCounters = false;
  }

  removeErrorList() {
    this.currentFocusedInput = -1;
    this.showListWithErrorsCounters = false;
  }

  handleTyping(index: number, e) {
    this.handleValueSetting(index, e.target.value);
  }

  createSpecifications() {
    const specifications = [];
    this.formStateItems.forEach(function(part, index) {
      if (!part.isAllErrorsResolved) {
        specifications.push({ index, numberOfErrors: part.contents.filter(content => content.isError).length });
      }
    });

    return specifications;
  }

  handleValueSetting(index: number, value: any) {
    this.formStateItems[index] = this.formService.validate(this.formStateItems[index], value,
      this.formSettings[index].validationSettings);

    this.isFormReadyToSubmit = this.formStateItems.filter(item => item.isAllErrorsResolved).length === this.numberOfFormItems;

  }

  handleSubmit(e) {
    e.preventDefault();
    this.formStateItems = this.formService.validateAll(this.formStateItems, this.formSettings);
    this.isFormReadyToSubmit = this.formStateItems.filter(item => item.isAllErrorsResolved).length === this.numberOfFormItems;
    this.currentFocusedInput = this.formStateItems.findIndex(item => !item.isAllErrorsResolved);

    if (this.isFormReadyToSubmit) {
      console.log(this.formStateItems);
    }

    this.submitFunction(this.formStateItems);
  }

}

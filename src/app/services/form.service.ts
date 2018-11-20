import { Injectable } from '@angular/core';
import FormModel from '../models/formModel';

const errorsNamingFunctions: {} = {
  minLength: (inputName, specifiedValue) => `Pole ${inputName} powinno mieć więcej niż ${specifiedValue} znaków`,
  maxLength: (inputName, specifiedValue) => `Pole ${inputName} powinno mieć mniej niż ${specifiedValue} znaków`,
  required: (inputName, specifiedValue) => `Pole ${inputName} jest wymagane`,
  isCorrectFormat: (inputName, specifiedValue) => `Pole ${inputName} ma zły format`,
  // tslint:disable-next-line:max-line-length
  shouldShowOneUppercase: (inputName, specifiedValue) => `Pole ${inputName} musi mieć ${specifiedValue < 2 ? 'duży' : 'duże'} ${specifiedValue < 2 ? 'znak' : 'znaki'}`,
  // tslint:disable-next-line:max-line-length
  isContainsNumber: (inputName, specifiedValue) => `Pole ${inputName} musi zawierać ${specifiedValue} ${specifiedValue < 2 ? 'cyfrę' : 'cyfry'}`,
  // tslint:disable-next-line:max-line-length
  isContainsSpecialChars: (inputName, specifiedValue) => `Pole ${inputName} musi zawierać ${specifiedValue} ${specifiedValue < 2 ? 'znak specjalny' : 'znaki specjalne'}`,
  mustHaveLength: (inputName, specifiedValue) => `Pole ${inputName} musi mieć ${specifiedValue} znaków `
};

@Injectable({
  providedIn: 'root'
})
export class FormService {
  validationFunctions: {} = {
    minLength: (value, specifiedValue) => this.handleMinLength(value.length, specifiedValue),
    maxLength: (value, specifiedValue) => this.handleMaxLength(value.length, specifiedValue),
    required: (value, specifiedValue) => this.handleRequired(value),
    isCorrectFormat: (value, specifiedValue) => this.handleFormat(value, specifiedValue),
    shouldShowOneUppercase: (value, specifiedValue) => this.handleUppercaseLetter(value, specifiedValue),
    isContainsNumber: (value, specifiedValue) => this.handleNumbers(value, specifiedValue),
    isContainsSpecialChars: (value, specifiedValue) => this.handleCharacters(value, specifiedValue),
    mustHaveLength: (value, specifiedValue) => this.handleLengthEqualTo(value.length, specifiedValue)
  };

  handleMinLength(valueLength: number, specifiedValue: number) {
    return valueLength < specifiedValue;
  }

  handleMaxLength(valueLength: number, specifiedValue: number) {
    return valueLength > specifiedValue;
  }

  handleRequired(value: any) {
    return value === '';
  }

  handleFormat(value: any, specifiedValue: any) {
    return !specifiedValue.test(value);
  }

  handleUppercaseLetter(value: any, specifiedValue: any){
    return this.handleSpecialCharactersLength(value, /^[A-Z]/) < specifiedValue;
  }

  handleSpecialCharactersLength(value: any, patern: RegExp) {
    let countOfLetters = 0;
    for (const key in value) {
        if (patern.test(value[key])) {
            countOfLetters++;
        }
    }
    return countOfLetters;
  }

  handleNumbers(value: any, specifiedValue: any) {
    return this.handleSpecialCharactersLength(value, /^[0-9]/) < specifiedValue;
  }

  handleCharacters(value: any, specifiedValue: any) {
    return value.length - this.handleSpecialCharactersLength(value, /^[a-zA-Z0-9]+$/) < specifiedValue;
  }

  handleLengthEqualTo(valueLength: number, specifiedValue: number) {
    return valueLength !== specifiedValue;
  }

  createFormItems(settings: FormModel[]): any[] {
    return settings.map(setting => {
       const keys = Object.keys(setting.validationSettings);
        // tslint:disable-next-line:max-line-length
        return { value: (setting.initialValue === undefined || setting.initialValue === null) ? '' : setting.initialValue, isAllErrorsResolved: null, contents: keys.map(key => {
            return { isError: null, content: errorsNamingFunctions[key](setting.label, setting.validationSettings[key])};
        })};
    });
  }

  validate(currentErrorObject: any, value: any, setting: any) {
    const copiedObject = {...currentErrorObject};
    const keys = Object.keys(setting);
    const keysLength = keys.length;
    for (let i = 0; i < keysLength; i++) {
        copiedObject.contents[i].isError = this.validationFunctions[keys[i]](value, setting[keys[i]]);
    }
    copiedObject.isAllErrorsResolved = copiedObject.contents.findIndex(content => content.isError) === -1;
    copiedObject.value = value;

    return copiedObject;
  }

  validateAll(formStateItems: any[], formSettings: any) {
    return formStateItems.map((item, index) => {
        return this.validate(item, item.value, formSettings[index].validationSettings);
    });
  }

  constructor() { }
}

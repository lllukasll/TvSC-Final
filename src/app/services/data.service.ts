import { Injectable } from '@angular/core';
import { ErrorModel } from '../models/errorModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDto = (response) => {
    if (response) {
      return response.dtoObject;
    }
  }

  getErrors = (errorModel) => {
    const errorsArray: ErrorModel[] = [];
    if (errorModel) {
      if (errorModel.status === 400) {
        errorModel.error.errorObjects.forEach(error => {
          errorsArray.push(error);
        });
      }
    }
    return errorsArray;
  }

  getErrorAsString = errorModel => {
    let errorToReturn: string;
    if (errorModel) {
      if (errorModel.status === 400) {
        errorModel.error.errorObjects.forEach(error => {
          errorToReturn = error;
        });
      }
    }
    return errorToReturn;
  }
}

import { Action } from '@ngrx/store';

export const SPINNER_SHOW = 'SPINNER_SHOW';
export const SPINNER_HIDE = 'SPINNER_HIDE';

export class HideSpinner implements Action {
  readonly type = SPINNER_HIDE;
}

export class ShowSpinner implements Action {
  readonly type = SPINNER_SHOW;
}

export type SpinnerAction = ShowSpinner | HideSpinner;

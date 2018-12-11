import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { INotification } from '../../../models/notification';
import * as moment from 'moment';
import { IStats } from '../../../models/stats';
import { Store, select } from '@ngrx/store';
import * as fromUserModule from '../../../reducers';
import { UpdateAvatar, ChangePassword } from '../../../actions/auth.actions';
import { CloseModal, ChangePasswordModalOpen } from '../../../../_shared/actions/modal';
import { takeWhile } from 'rxjs/operators';
import * as fromShared from '../../../../_shared/reducers';
import FormModel from '../../../../_shared/models/formModel';
import { ITvSeriesProposition } from '../../../models/tvSeriesProposition';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, OnDestroy {
  @Input() notifications: INotification[];
  @Input() propositions: ITvSeriesProposition[];
  @Input() loggedUser: any;
  @Input() stats: IStats;
  componentActive = true;
  changePasswordModalOpened = false;
  changePasswordError = null;
  selectedFile: File;
  url: any;

  changePasswordSettings: FormModel[] = [
    { label: '', placeholder: 'Stare hasło...', type: 'password', mode: 'input', initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        }, listElements: []
    },
    { label: '', placeholder: 'Nowe hasło...', type: 'password', mode: 'input', initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        }, listElements: []
    },
    { label: '', placeholder: 'Powtórz hasło...', type: 'password', mode: 'input', initialValue: null,
        validationSettings: {
            minLength: 7, maxLength: 25, required: true, shouldShowOneUppercase: 1, isContainsNumber: 1, isContainsSpecialChars: 1
        }, listElements: []
    }
  ];

  constructor(private store: Store<fromUserModule.State>) { }

  getTime(notification: INotification) {
    moment.locale('pl');

    return moment(notification.createDateTime).startOf('minute').fromNow();
  }

  onChangePasswordClick(): void {
    if (this.changePasswordModalOpened) {
      this.delay(100).then(() => this.store.dispatch(new CloseModal()));
    } else {
      this.delay(100).then(() => this.store.dispatch(new ChangePasswordModalOpen()));
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  savePassword = (changePasswordForm: any) => {
    const payload = {
      password: changePasswordForm[0].value,
      newPassword: changePasswordForm[1].value,
      confirmNewPassword: changePasswordForm[2].value
    };

    this.store.dispatch(new ChangePassword(payload));
  }

  onFileChanged(event) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (e) => {
        this.url = reader.result;
      };
    }
  }

  saveAvatar() {
    this.store.dispatch(new UpdateAvatar({avatar: this.selectedFile}));
  }

  ngOnInit() {
    this.store.pipe(select(fromShared.isChangePasswordModalOpened), takeWhile(() => this.componentActive)).subscribe(
      changePasswordModalState => { this.changePasswordModalOpened = changePasswordModalState; }
    );

    this.store.pipe(select(fromUserModule.getChangePasswordError), takeWhile(() => this.componentActive)).subscribe(
      changePasswordError => { this.changePasswordError = changePasswordError; }
    );
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

}

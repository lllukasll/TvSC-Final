import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificationContainerComponent } from './containers/notification-container/notification.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpinnerComponent, NotificationContainerComponent, NotificationComponent],
  exports: [SpinnerComponent, NotificationContainerComponent]
})
export class SharedModule { }

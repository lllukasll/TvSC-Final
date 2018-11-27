import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificationContainerComponent } from './containers/notification-container/notification.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RatingContainerComponent } from './components/rating/rating-container/rating-container.component';
import { RatingComponent } from './components/rating/rating/rating.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpinnerComponent, NotificationContainerComponent, NotificationComponent, RatingContainerComponent, RatingComponent],
  exports: [SpinnerComponent, NotificationContainerComponent, RatingContainerComponent]
})
export class SharedModule { }

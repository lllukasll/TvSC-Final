import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificationContainerComponent } from './containers/notification-container/notification.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RatingContainerComponent } from './components/rating/rating-container/rating-container.component';
import { RatingComponent } from './components/rating/rating/rating.component';
import { CircleLoaderComponent } from './components/circle-loader/circle-loader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SpinnerComponent, NotificationContainerComponent, NotificationComponent, RatingContainerComponent, RatingComponent, CircleLoaderComponent],
  exports: [SpinnerComponent, NotificationContainerComponent, RatingContainerComponent, CircleLoaderComponent]
})
export class SharedModule { }

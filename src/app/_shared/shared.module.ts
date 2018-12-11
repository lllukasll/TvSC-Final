import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotificationContainerComponent } from './containers/notification-container/notification.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RatingContainerComponent } from './components/rating/rating-container/rating-container.component';
import { RatingComponent } from './components/rating/rating/rating.component';
import { CircleLoaderComponent } from './components/circle-loader/circle-loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormComponent } from './components/form/form.component';
import { TvSeriesCardComponent } from './components/tv-series-card/tv-series-list-card.component';
import { SliderComponent } from './components/slider/slider.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [SpinnerComponent, FormComponent, TvSeriesCardComponent, NotificationContainerComponent, NotificationComponent, RatingContainerComponent, RatingComponent, CircleLoaderComponent, ModalComponent, SliderComponent],
  exports: [SpinnerComponent, FormComponent, TvSeriesCardComponent, NotificationContainerComponent, RatingContainerComponent, CircleLoaderComponent, ModalComponent, SliderComponent]
})
export class SharedModule { }

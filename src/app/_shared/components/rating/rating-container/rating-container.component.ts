import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IRatingModel } from '../../../models/rating';

@Component({
  selector: 'app-rating-container',
  templateUrl: './rating-container.component.html',
  styleUrls: ['./rating-container.component.scss']
})
export class RatingContainerComponent implements OnInit {
  @Input() message = 'Dodaj ocenę';
  @Input() addRating = true;
  @Input() ratingModel: IRatingModel[];
  @Output() sendRating = new EventEmitter();
  @Input() buttonContent = 'Dodaj ocenę';

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.sendRating.emit(this.ratingModel);
  }
}

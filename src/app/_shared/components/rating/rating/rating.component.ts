import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() ratingName = '';
  @Output() starsClicked = new EventEmitter();
  @Input() initialStarValue = 0;

  star1Hover = false;
  star2Hover = false;
  star3Hover = false;
  star4Hover = false;
  star5Hover = false;

  star1Clicked = false;
  star2Clicked = false;
  star3Clicked = false;
  star4Clicked = false;
  star5Clicked = false;

  starsValue = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.starsValue = this.initialStarValue;
    this.onStarClicked(this.initialStarValue);
  }

  onStarClicked(starNumber: number) {
    if (starNumber === 0) {
      this.star1Clicked = false;
      this.star2Clicked = false;
      this.star3Clicked = false;
      this.star4Clicked = false;
      this.star5Clicked = false;
      this.starsValue = 0;
    } else if (starNumber === 1) {
      this.star1Clicked = true;
      this.star2Clicked = false;
      this.star3Clicked = false;
      this.star4Clicked = false;
      this.star5Clicked = false;
      this.starsValue = 1;
    } else if (starNumber === 2) {
      this.star1Clicked = true;
      this.star2Clicked = true;
      this.star3Clicked = false;
      this.star4Clicked = false;
      this.star5Clicked = false;
      this.starsValue = 2;
    } else if (starNumber === 3) {
      this.star1Clicked = true;
      this.star2Clicked = true;
      this.star3Clicked = true;
      this.star4Clicked = false;
      this.star5Clicked = false;
      this.starsValue = 3;
    } else if (starNumber === 4) {
      this.star1Clicked = true;
      this.star2Clicked = true;
      this.star3Clicked = true;
      this.star4Clicked = true;
      this.star5Clicked = false;
      this.starsValue = 4;
    } else if (starNumber === 5) {
      this.star1Clicked = true;
      this.star2Clicked = true;
      this.star3Clicked = true;
      this.star4Clicked = true;
      this.star5Clicked = true;
      this.starsValue = 5;
    }

    this.starsClicked.emit(this.starsValue);
  }

  onMouseOverStar(starNumber: number) {
    if (starNumber === 1) {
      this.star1Hover = true;
    } else if (starNumber === 2) {
      this.star1Hover = true;
      this.star2Hover = true;
    } else if (starNumber === 3) {
      this.star1Hover = true;
      this.star2Hover = true;
      this.star3Hover = true;
    } else if (starNumber === 4) {
      this.star1Hover = true;
      this.star2Hover = true;
      this.star3Hover = true;
      this.star4Hover = true;
    } else if (starNumber === 5) {
      this.star1Hover = true;
      this.star2Hover = true;
      this.star3Hover = true;
      this.star4Hover = true;
      this.star5Hover = true;
    }
  }

  onMouseOutStar() {
    this.star1Hover = false;
    this.star2Hover = false;
    this.star3Hover = false;
    this.star4Hover = false;
    this.star5Hover = false;
  }

}

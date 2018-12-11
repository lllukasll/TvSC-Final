import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() height = 300;
  @Input() sliderElements: any[];
  @Input() sliderSpeed: 1000;
  @Input() showDescription = false;
  @Input() sliderTitle = '';

  @ViewChild('tvShowsHolder0', { read: ElementRef })
  public container0: ElementRef<any>;

  constructor() { }

  ngOnInit() { }

  scrollToRight(): void {
    const clickedElement = this.container0;
    const scrollWidth = (this.height - 60) * 0.8 + 10;

    const screenLeft =
      clickedElement.nativeElement.scrollWidth -
      clickedElement.nativeElement.scrollLeft -
      clickedElement.nativeElement.offsetWidth;
    let scrollToDecrese = 'translateX(' + scrollWidth + 'px)';

    if (screenLeft < scrollWidth) {
      scrollToDecrese = 'translateX(' + screenLeft + 'px)';
    }

    if (screenLeft < scrollWidth) {
      clickedElement.nativeElement.scrollLeft += screenLeft;
    } else {
      clickedElement.nativeElement.scrollLeft += scrollWidth;
    }

    const keyframes = [
      {
        transform: scrollToDecrese
      },
      {
        transform: 'translate(0)'
      }
    ];

    const options = {
      iterations: 1,
      iterationStart: 0,
      delay: 0,
      endDelay: 0,
      direction: 'normal',
      duration: 1000,
      fill: 'none',
      easing: 'ease-in-out'
    };

    for (
      let index = 0;
      index < clickedElement.nativeElement.children.length;
      index++
    ) {
      clickedElement.nativeElement.children[index].animate(keyframes, options);
    }
  }

  scrollToLeft(): void {
    const clickedElement = this.container0;
    const scrollWidth = (this.height - 60) * 0.8 + 10;

    const screenLeft = clickedElement.nativeElement.scrollLeft;
    let scrollToDecrese = 'translateX(-' + scrollWidth + 'px)';

    if (screenLeft < scrollWidth) {
      scrollToDecrese = 'translateX(-' + screenLeft + 'px)';
    }

    if (screenLeft < scrollWidth) {
      clickedElement.nativeElement.scrollLeft -= screenLeft;
    } else {
      clickedElement.nativeElement.scrollLeft -= scrollWidth;
    }

    const keyframes = [
      {
        transform: scrollToDecrese
      },
      {
        transform: 'translateX(0)'
      }
    ];

    const options = {
      iterations: 1,
      iterationStart: 0,
      delay: 0,
      endDelay: 0,
      direction: 'normal',
      duration: 1000,
      fill: 'none',
      easing: 'ease-in-out'
    };

    for (
      let index = 0;
      index < clickedElement.nativeElement.children.length;
      index++
    ) {
      clickedElement.nativeElement.children[index].animate(keyframes, options);
    }
  }

}

import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[clickOutside]' })
export class ClickOutsideDirective {
  constructor(private _elementRef: ElementRef) {
  }

  @Output()
    public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}


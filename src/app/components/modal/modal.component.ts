import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() opened: boolean;
  @Input() width: number;
  @Input() height: number;
  @Input() background: string;
  @Input() border: string;
  @Input() border_radius: string;
  @Output() closed = new EventEmitter();
  fullyOpened: boolean;
  delayTime: number;

  @ViewChild('modal', { read: ElementRef }) public modal: ElementRef<any>;
  @HostListener('document:click', ['$event'])
    clickout(event) {
      if (this.fullyOpened && !this.modal.nativeElement.contains(event.target)) {
        this.onClose();
      }
  }

  constructor() {
    this.background = '';
    this.border = '';
    this.border_radius = '';
    this.opened = false;
    this.fullyOpened = false;
    this.delayTime = 100;
   }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    if (this.opened) {
      console.log('opened true');
      this.delay(this.delayTime).then(() => this.fullyOpened = true);
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms));
}

  onClose(): void {
    this.closed.emit();
    this.fullyOpened = false;
  }
}

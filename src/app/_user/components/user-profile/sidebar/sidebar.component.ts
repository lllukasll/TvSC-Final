import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() optionClicked = new EventEmitter();
  @Input() loggedUser: any;

  constructor() { }

  onClick(value: string) {
    this.optionClicked.emit(value);
  }

  ngOnInit() {
  }

}

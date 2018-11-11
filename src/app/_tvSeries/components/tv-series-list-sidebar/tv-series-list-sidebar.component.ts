import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tv-series-list-sidebar',
  templateUrl: './tv-series-list-sidebar.component.html',
  styleUrls: ['./tv-series-list-sidebar.component.scss']
})
export class TvSeriesListSidebarComponent implements OnInit {

  sidebarOpen = true;

  constructor() { }

  ngOnInit() {
  }

  toogleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}

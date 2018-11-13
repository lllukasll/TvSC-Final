import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tv-series-list-sidebar',
  templateUrl: './tv-series-list-sidebar.component.html',
  styleUrls: ['./tv-series-list-sidebar.component.scss']
})
export class TvSeriesListSidebarComponent implements OnInit {

  sidebarOpen = true;
  categories = [];
  networks = [];
  status = 0;
  @Output() submited = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSubmit(): void {
    const parameters = {
      categories: this.categories,
      networks: this.networks,
      status: this.status
    };

    this.submited.emit(parameters);
  }

  checkifStatusClicked(value): boolean {
    if (this.status === value) {
      return true;
    } else {
      return false;
    }
  }

  onStatusClicked(value): void {
    if (this.status === value)
    {
      this.status = 0;
    } else {
      this.status = value;
    }
  }

  checkIfOnNetworksList(value): boolean {
    if (this.networks.length > 0 && this.networks.includes(value)) {
      return true;
    } else {
      return false;
    }
  }

  onNetworkClicked(event): void {
    if (this.networks.length > 0 && this.networks.includes(event.target.innerText)) {
      this.networks.splice(this.networks.indexOf(event.target.innerText), 1);
    } else {
      this.networks.push(event.target.innerText);
    }
  }

  checkIfOnCategoriesList(value): boolean {
    if (this.categories.length > 0 && this.categories.includes(value)) {
      return true;
    } else {
      return false;
    }
  }

  onCategoryClicked(event): void {
    if (this.categories.length > 0 && this.categories.includes(event.target.innerText)) {
      this.categories.splice(this.categories.indexOf(event.target.innerText), 1);
    } else {
      this.categories.push(event.target.innerText);
    }
  }

  toogleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

}

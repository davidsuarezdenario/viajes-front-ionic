import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { addIcons } from 'ionicons';
import { search } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SearchMainComponent implements OnInit {
  @ViewChild('popover') popover: any;

  searchBusy: boolean = false;
  isOpen: boolean = false;

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) {
    addIcons({ search });
  }

  ngOnInit() { }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  dismissPopover() {
    this.isOpen = false;
  }

  firstSearch(ev: any = null) {
    this.presentPopover(ev);
    if (this.canSearch()) {
      this.searchApi(this.glbService.searchTo);
    }
  }

  canSearch(): boolean {
    if (this.searchBusy) return false;
    if (this.glbService.searchTo.length < 3) {
      this.resetSearch();
      return false;
    }
    return true;
  }

  resetSearch() {
    this.searchBusy = false;
    this.glbService.airports = [];
    this.dismissPopover();
  }

  async searchApi(searchTo: string) {
    this.searchBusy = true;
    const body = { search: searchTo };
    try {
      const response: any = await this.apiService.post('/travel/search_airport', body);
      if (!response.error) this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.searchBusy = false;
      if (searchTo != this.glbService.searchTo) this.firstSearch();
    }
  }

  handleError(error: any) {
    // Handle error here
  }

  handleResponse(data: any) {
    this.glbService.airports = data.locations;
    if (this.glbService.airports.length == 0) this.dismissPopover();
  }

}

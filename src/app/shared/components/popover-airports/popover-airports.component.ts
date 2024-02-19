import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-popover-airports',
  templateUrl: './popover-airports.component.html',
  styleUrls: ['./popover-airports.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class PopoverAirportsComponent implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen: boolean = false;
  searchBusy: boolean = false;
  search: string = "";
  field: string = "";

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) { }

  ngOnInit() { }

  dismissPopover() {
    this.isOpen = false;
    const airport = this.field === 'from' ? this.glbService.selectAirportFrom : this.glbService.selectAirportTo;
    const searchField = this.field === 'from' ? 'searchFrom' : 'searchTo';
    if (!airport.code) {
      this.glbService[searchField] = "";
    } else {
      this.glbService[searchField] = `${airport.city.name}-${airport.code}`;
    }
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  airportSearch(ev: any = null, field: string = "") {
    this.search = ev?.target?.value || "";
    this.field = field;
    console.log('search airport: ', this.search);
    console.log('field: ', this.field);
    this.presentPopover(ev);
    if (this.canSearch(this.search)) this.searchApi(this.search);
  }

  canSearch(search: string): boolean {
    if (search.length < 3) {
      this.resetSearch();
      return false;
    }
    if (this.searchBusy) return false;
    return true;
  }

  resetSearch() {
    this.searchBusy = false;
    this.glbService.airports = [];
    /* this.dismissPopover(); */
  }

  async searchApi(search: string) {
    this.searchBusy = true;
    const normalizedSearch = this.glbService.normalizeString(search);
    console.log('normalizedSearch: ', normalizedSearch);
    const body = { search: normalizedSearch };
    try {
      const response: any = await this.apiService.post('/travel/search_airport', body);
      if (!response.error) this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.searchBusy = false;
      if (body.search != this.glbService.normalizeString(this.search)) this.searchApi(this.search);
    }
  }

  handleError(error: any) {
    // Handle error here
  }

  handleResponse(data: any) {
    this.glbService.airports = data.locations;
    /* if (this.glbService.airports.length == 0) this.dismissPopover(); */
  }

  selectAirport(airport: any) {
    if (this.field == 'from') {
      this.glbService.selectAirportFrom = airport;
      this.glbService.searchFrom = `${airport.city.name}-${airport.code}`;
    }
    else if (this.field == 'to') {
      this.glbService.selectAirportTo = airport;
      this.glbService.searchTo = `${airport.city.name}-${airport.code}`;
    }
    this.dismissPopover();
    console.log('airport: ', airport);
    this.glbService.bookingResults = [];
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonPopover, IonIcon, IonSpinner, IonLabel, IonItem } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { airplaneOutline, businessOutline } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-popover-airports',
  templateUrl: './popover-airports.component.html',
  styleUrls: ['./popover-airports.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonSpinner, IonIcon, IonPopover, CommonModule, FormsModule ],
})
export class PopoverAirportsComponent implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen: boolean = false;
  searchBusy: boolean = false;
  search: string = "";
  field: string = "";
  airports: any = [];

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) { 
    addIcons({ airplaneOutline, businessOutline });
  }

  ngOnInit() { }

  dismissPopover() {
    this.isOpen = false;
    const airport = this.field === 'from' ? this.glbService.selectAirportFrom : this.glbService.selectAirportTo;
    const searchField = this.field === 'from' ? 'searchFrom' : 'searchTo';
    if (!airport.code) {
      this.glbService[searchField] = "";
    } else {
      if(airport.type == 'city') this.glbService[searchField] = `${airport.name}-${airport.code}`;
      if(airport.type == 'airport') this.glbService[searchField] = `${airport.city.name}-${airport.code}`;
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
    this.airports = [];
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
    console.log('data: ', data);
    this.airports = data.locations;
    /* if (this.glbService.airports.length == 0) this.dismissPopover(); */
  }

  selectAirport(airport: any) {
    console.log('airport: ', airport);
    const isFrom = this.field === 'from';
    const targetProperty = isFrom ? 'selectAirportFrom' : 'selectAirportTo';
    const searchProperty = isFrom ? 'searchFrom' : 'searchTo';
    const airportOrCityName = airport.type === 'city' ? airport.name : airport.city?.name;

    this.glbService[targetProperty] = airport;
    this.glbService[searchProperty] = `${airportOrCityName}-${airport.code}`;

    this.dismissPopover();
    this.glbService.bookingResults = [];
  }

}

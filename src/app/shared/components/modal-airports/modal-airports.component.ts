import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonInput, IonSpinner, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { airplaneOutline, businessOutline, closeCircleOutline } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-modal-airports',
  templateUrl: './modal-airports.component.html',
  styleUrls: ['./modal-airports.component.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonSpinner, IonInput, IonContent, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonModal, CommonModule, FormsModule]
})
export class ModalAirportsComponent  implements OnInit {
  @ViewChild('input') input!: IonInput;
  @Input() label: string = "";
  @Input() show: string = "";
  isModalOpen = false;
  search: string = "";
  searchBusy: boolean = false;
  airports: any = [];
  autofocus: boolean = false;

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) { 
    addIcons({ airplaneOutline, businessOutline, closeCircleOutline });
  }

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (isOpen) this.handleOpen();
    if (!isOpen) this.handleClose();
  }

  handleOpen() {
    const isFrom = this.label === 'Origen';
    const searchProperty = isFrom ? 'searchFrom' : 'searchTo';
    const airportsProperty = isFrom ? 'airportsFrom' : 'airportsTo';
    const selectedAirportProperty = isFrom ? 'selectAirportFrom' : null;
    const storageKey = isFrom ? 'airportsSelectedFrom' : 'airportsSelectedTo';
  
    this.search = this.glbService[searchProperty];
    this.airports = this.getAirports(airportsProperty, storageKey, selectedAirportProperty);
  }

  presentModal(){
    this.input.setFocus();
  }
  
  getAirports(airportsProperty: string, storageKey: string, selectedAirportProperty: string | null) {
    let airports = (this.glbService as any)[airportsProperty];
    if(airports.length == 0) airports = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if(airports.length == 0 && selectedAirportProperty) {
      console.log('seleccion de aeropuerto from por defecto, guardada');
      airports.push((this.glbService as any)[selectedAirportProperty]);
      this.saveAirportSelection(storageKey, (this.glbService as any)[selectedAirportProperty]);
    }
    return airports;
  }

  handleClose() {
    this.autofocus = false;
    const airport = this.label === 'Origen' ? this.glbService.selectAirportFrom : this.glbService.selectAirportTo;
    const searchlabel = this.label === 'Origen' ? 'searchFrom' : 'searchTo';
    if (!airport.code) {
      this.glbService[searchlabel] = "";
    } else {
      if(airport.type == 'city') this.glbService[searchlabel] = `${airport.name}-${airport.code}`;
      if(airport.type == 'airport') this.glbService[searchlabel] = `${airport.city.name}-${airport.code}`;
    }
  }

  airportSearch() {
    console.log('search airport: ', this.search);
    console.log('label: ', this.label);
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

    const isFrom = this.label === 'Origen';
    const airportsProperty = isFrom ? 'airportsFrom' : 'airportsTo';
    const selectedAirportProperty = isFrom ? 'selectAirportFrom' : null;
    const storageKey = isFrom ? 'airportsSelectedFrom' : 'airportsSelectedTo';

    this.glbService[airportsProperty] = [];
    this.airports = this.getAirports(airportsProperty, storageKey, selectedAirportProperty);
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
    if(this.label === 'Origen') this.glbService.airportsFrom = data.locations;
    if(this.label === 'Destino') this.glbService.airportsTo = data.locations;
    /* if (this.glbService.airports.length == 0) this.dismissPopover(); */
  }

  selectAirport(airport: any) {
    const isFrom = this.label === 'Origen';
    const targetProperty = isFrom ? 'selectAirportFrom' : 'selectAirportTo';
    const searchProperty = isFrom ? 'searchFrom' : 'searchTo';
    const airportOrCityName = airport.type === 'city' ? airport.name : airport.city?.name;
  
    this.glbService[targetProperty] = airport;
    this.glbService[searchProperty] = `${airportOrCityName}-${airport.code}`;
  
    const storageKey = isFrom ? 'airportsSelectedFrom' : 'airportsSelectedTo';
    this.saveAirportSelection(storageKey, airport);
  
    this.setOpen(false);
    this.glbService.bookingResults = [];
  }
  
  saveAirportSelection(key: string, airport: any) {
    let airportsSelected = JSON.parse(localStorage.getItem(key) || '[]');
    const index = airportsSelected.findIndex((a: any) => a.code === airport.code);
    if (index > -1) {
      airportsSelected.splice(index, 1);
    }
    airportsSelected.unshift(airport);
    airportsSelected = airportsSelected.slice(0, 10);
    localStorage.setItem(key, JSON.stringify(airportsSelected));
  }

}

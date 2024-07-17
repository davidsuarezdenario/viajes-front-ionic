import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from "@angular/common";
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonInput, IonSpinner, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { airplaneOutline, businessOutline, closeCircleOutline, backspaceOutline, earthOutline } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";
import { SearchMainService } from "../../services/search-main/search-main.service";

@Component({
  selector: 'app-modal-airports',
  templateUrl: './modal-airports.component.html',
  styleUrls: ['./modal-airports.component.scss'],
  standalone: true,
  imports: [IonLabel, IonIcon, IonSpinner, IonInput, IonContent, IonButton, IonButtons, IonTitle, IonToolbar, IonHeader, IonModal, CommonModule, FormsModule]
})
export class ModalAirportsComponent implements OnInit {
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
    private apiService: ApiService,
    private searchMainService: SearchMainService
  ) {
    addIcons({ airplaneOutline, businessOutline, closeCircleOutline, backspaceOutline, earthOutline });
  }

  ngOnInit() { }

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

  presentModal() {
    this.input.setFocus();
  }

  getAirports(airportsProperty: string, storageKey: string, selectedAirportProperty: string | null) {
    let airports = (this.glbService as any)[airportsProperty];
    if (airports.length == 0) airports = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (airports.length == 0 && selectedAirportProperty) {
      console.log('seleccion de aeropuerto from por defecto, guardada');
      airports.push((this.glbService as any)[selectedAirportProperty]);
      this.saveAirportSelection(storageKey, (this.glbService as any)[selectedAirportProperty]);
    }
    return airports;
  }

  handleClose() {
    this.autofocus = false;
    const titlecase = new TitleCasePipe();
    const airport = this.label === 'Origen' ? this.glbService.selectAirportFrom : this.glbService.selectAirportTo;
    const searchlabel = this.label === 'Origen' ? 'searchFrom' : 'searchTo';
    if (!airport.iata) {
      this.glbService[searchlabel] = "";
    } else {
      /* if(airport.subType == 'CITY') this.glbService[searchlabel] = `${titlecase.transform(airport.name)}-${airport.iataCode}`;
      if(airport.subType == 'AIRPORTS') this.glbService[searchlabel] = `${titlecase.transform(airport.name)}-${airport.iataCode}`; */
      this.glbService[searchlabel] = `${titlecase.transform(airport.city)}-${airport.iata}`;
    }
  }

  deleteSearch() {
    this.search = '';
    this.resetSearch();
    this.input.setFocus();
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

  async searchApi1(search: string) {
    this.searchBusy = true;
    const normalizedSearch = this.glbService.normalizeString(search);
    console.log('normalizedSearch: ', normalizedSearch);
    const body = { search: normalizedSearch, limit: 50, location_types: ["CITY", "AIRPORTS"] };
    try {
      const response: any = await this.apiService.post('/travel/search_airport', body);
      console.log('response: ', response);
      if (!response.error) this.handleResponse(response.data);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.searchBusy = false;
      if (body.search != this.glbService.normalizeString(this.search)) this.searchApi(this.search);
    }
  }

  async searchApi(search: string) {
    this.searchBusy = true;
    const normalizedSearch = this.glbService.normalizeString(search);
    const suggestIata = await this.updateIataCodes(normalizedSearch);
    this.handleResponse(suggestIata);
    console.log('suggestIata: ', suggestIata);
    this.searchBusy = false;
  }

  async updateIataCodes(text: string) {
    return this.glbService.iataCodes.filter((iata: any) => {
      return (
        iata.airport.indexOf(text) !== -1
        || iata.city.toLowerCase().indexOf(text) !== -1
        || iata.iata.toLowerCase().indexOf(text) !== -1
        || !text);
    });
  }

  handleError(error: any) {
    // Handle error here
  }

  handleResponse(data: any) {
    this.airports = data;
    console.log('airports: ', this.airports);
    if(this.label === 'Origen') this.glbService.airportsFrom = data;
    if(this.label === 'Destino') this.glbService.airportsTo = data;
    /* if (this.glbService.airports.length == 0) this.dismissPopover(); */
  }

  selectAirport(airport: any) {
    console.log('airport: ', airport);
    const isFrom = this.label === 'Origen';
    const titlecase = new TitleCasePipe();
    const targetProperty = isFrom ? 'selectAirportFrom' : 'selectAirportTo';
    const searchProperty = isFrom ? 'searchFrom' : 'searchTo';
    /* const airportOrCityName = airport.subType === 'CITY' ? airport.address?.cityName : airport.name; */
    const airportOrCityName = `${(titlecase.transform(airport.city))}-${airport.iata}`;
    this.glbService[targetProperty] = airport;
    this.glbService[searchProperty] = airportOrCityName;
    /* const typeToPropertyMap:any = { 'city': 'name', 'airport': 'city?.name', 'country': 'name' };
    const airportOrCityName = airport[typeToPropertyMap[airport.type]]; */
    const storageKey = isFrom ? 'airportsSelectedFrom' : 'airportsSelectedTo';
    this.saveAirportSelection(storageKey, airport);

    this.setOpen(false);
    if (!this.glbService.firstSearch) {
      this.searchMainService.explorar();
    }
  }

  saveAirportSelection(key: string, airport: any) {
    console.log('guardando aeropuerto seleccionado: ', airport);
    let airportsSelected = JSON.parse(localStorage.getItem(key) || '[]');
    const index = airportsSelected.findIndex((a: any) => a.code === airport.iataCode);
    if (index > -1) {
      airportsSelected.splice(index, 1);
    }
    airportsSelected.unshift(airport);
    airportsSelected = airportsSelected.slice(0, 10);
    localStorage.setItem(key, JSON.stringify(airportsSelected));
  }

}

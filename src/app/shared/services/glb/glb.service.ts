import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { selectAirportFromMock } from "../api/mocks/mocks-origin-search";
import { testBookingResults } from "../api/mocks/mock-result-search";

@Injectable({
  providedIn: 'root'
})
export class GlbService {

  sesion: boolean = false;
  idCliente: string = "";
  userData: any = {};

  searchFrom: string = "";
  searchTo: string = "";
  firstSearch: boolean = true;
  selectAirportFrom: any = {};
  selectAirportTo: any = {};
  airportsFrom: any = [];
  airportsTo: any = [];
  today = format(new Date(), 'yyyy-MM-dd');
  selectedDateSalidaStart: string = this.today;
  selectedDateSalidaEnd: string = this.today;
  selectedDateRegresoStart: string = this.today;
  selectedDateRegresoEnd: string = this.today;

  passengers: any = {
    adult: 1,
    child: 0,
    infant: 0
  }
  get totalPassengers() { return this.passengers.adult + this.passengers.child + this.passengers.infant; }
  bags: any = {
    hand: 0,
    hold: 0
  }
  get totalBags() { return this.bags.hand + this.bags.hold; }
  trips: string = "idaVuelta";
  clase: string = "M";
  dateFrom: string = this.today;
  dateTo: string = this.today;

  bookingloading: boolean = false;
  bookingResults: any = [];

  constructor() {
    this.initCityFrom();
    /* this.testBookingResults(); */
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  initCityFrom() {
    const airportsSelectedFrom = JSON.parse(localStorage.getItem('airportsSelectedFrom') || '[]');
    if (airportsSelectedFrom.length == 0) this.selectAirportFrom = selectAirportFromMock;
    else this.selectAirportFrom = airportsSelectedFrom[0];
    console.log('selectAirportFrom: ', this.selectAirportFrom);
    if (this.selectAirportFrom.type == 'city') this.searchFrom = `${this.selectAirportFrom.name}-${this.selectAirportFrom.code}`;
    if (this.selectAirportFrom.type == 'airport') this.searchFrom = `${this.selectAirportFrom.city.name}-${this.selectAirportFrom.code}`;
    if (this.selectAirportFrom.type == 'country') this.searchFrom = `${this.selectAirportFrom.name}-${this.selectAirportFrom.code}`;
    const airportsSelectedTo = JSON.parse(localStorage.getItem('airportsSelectedTo') || '[]');
    if (airportsSelectedTo.length == 0) this.selectAirportTo = {};
    else this.selectAirportTo = airportsSelectedTo[0];
    console.log('selectAirportTo: ', this.selectAirportTo);
    if (this.selectAirportTo.type == 'city') this.searchTo = `${this.selectAirportTo.name}-${this.selectAirportTo.code}`;
    if (this.selectAirportTo.type == 'airport') this.searchTo = `${this.selectAirportTo.city.name}-${this.selectAirportTo.code}`;
    if (this.selectAirportTo.type == 'country') this.searchTo = `${this.selectAirportTo.name}-${this.selectAirportTo.code}`;
  }

  testBookingResults() {
    this.firstSearch = false;
    this.bookingResults = testBookingResults;
  }
}

import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { TitleCasePipe } from '@angular/common';
import { selectAirportFromMock } from "../api/mocks/mocks-origin-search";
import { testBookingResults } from "../api/mocks/mock-result-search";

@Injectable({
  providedIn: 'root'
})
export class GlbService {

  sesion: boolean = false;
  idCliente: string = "";
  userData: any = {};
  iataCodes: any = [];

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

  passengers: any = { adult: 1, child: 0, infant: 0 }
  get totalPassengers() { return this.passengers.adult + this.passengers.child + this.passengers.infant; }
  bags: any = { hand: 0, hold: 0 }
  get totalBags() { return this.bags.hand + this.bags.hold; }
  trips: string = "idaVuelta";
  clase: string = "Y";
  dateFrom: string = this.today;
  dateTo: string = this.today;

  bookingloading: boolean = false;
  bookingResults: any = [];

  flightSelected: any = [];
  session: any = {};

  passengersData: any = [];

  constructor() {
    this.initCityFrom();
    /* this.testBookingResults(); */
  }

  normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  initCityFrom() {
    const airportsSelectedFrom = JSON.parse(localStorage.getItem('airportsSelectedFrom') || '[]');
    const titlecase = new TitleCasePipe();
    if (airportsSelectedFrom.length == 0) this.selectAirportFrom = selectAirportFromMock;
    else this.selectAirportFrom = airportsSelectedFrom[0];
    /* if (this.selectAirportFrom.subType == 'CITY') this.searchFrom = `${titlecase.transform(this.selectAirportFrom.name)}-${this.selectAirportFrom.iataCode}`;
    if (this.selectAirportFrom.subType == 'AIRPORTS') this.searchFrom = `${titlecase.transform(this.selectAirportFrom.city.name)}-${this.selectAirportFrom.iataCode}`; */
    this.searchFrom = `${titlecase.transform(this.selectAirportFrom.city)}-${this.selectAirportFrom.iata}`;
    const airportsSelectedTo = JSON.parse(localStorage.getItem('airportsSelectedTo') || '[]');
    if (airportsSelectedTo.length == 0) this.selectAirportTo = {};
    else this.selectAirportTo = airportsSelectedTo[0];
    /* if (this.selectAirportTo.subType == 'CITY') this.searchTo = `${titlecase.transform(this.selectAirportTo.name)}-${this.selectAirportTo.iataCode}`;
    if (this.selectAirportTo.subType == 'AIRPORTS') this.searchTo = `${titlecase.transform(this.selectAirportTo.city.name)}-${this.selectAirportTo.iataCode}`; */
    this.searchTo = `${titlecase.transform(this.selectAirportTo.city)}-${this.selectAirportTo.iata}`;
  }

  testBookingResults() {
    this.firstSearch = false;
    this.bookingResults = testBookingResults;
  }

  iataToName(iata: string): any {
    const airport = this.iataCodes.find((airport: any) => this.normalizeString(airport.iata) == this.normalizeString(iata));
    return airport ? airport : [{iata: '', airport: 'Estación de tren', city: '', country: '', continent: ''}];
  }
}

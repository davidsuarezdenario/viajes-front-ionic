import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { TitleCasePipe } from '@angular/common';
import { selectAirportFromMock } from "../api/mocks/mocks-origin-search";
import { testBookingResults } from "../api/mocks/mock-result-search";
import { PopoverController } from '@ionic/angular';
import { InfoFlightPage } from '../../components/info-flight/info-flight.page';

@Injectable({
  providedIn: 'root'
})
export class GlbService {

  sesion: boolean = false;
  idCliente: string = "";
  userData: any = {};
  iataCodes: any = [];
  infoFlightArray: any = [];

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
  nonStop: boolean = false;
  dateFrom: string = this.today;
  dateTo: string = this.today;

  bookingloading: boolean = false;
  bookingResults: any = [];

  flightSelected: any = [];
  session: any = {};

  passengersData: any = [];

  constructor(private popoverController: PopoverController) {
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
    this.searchFrom = (this.selectAirportFrom.city && this.selectAirportFrom.iata) ? `${titlecase.transform(this.selectAirportFrom.city)}-${this.selectAirportFrom.iata}` : '';
    const airportsSelectedTo = JSON.parse(localStorage.getItem('airportsSelectedTo') || '[]');
    if (airportsSelectedTo.length == 0) this.selectAirportTo = {};
    else this.selectAirportTo = airportsSelectedTo[0];
    this.searchTo = (this.selectAirportTo.city && this.selectAirportTo.iata) ? `${titlecase.transform(this.selectAirportTo.city)}-${this.selectAirportTo.iata}` : '';
  }

  testBookingResults() {
    this.firstSearch = false;
    this.bookingResults = testBookingResults;
  }

  iataToName(iata: string): any {
    const airport = this.iataCodes.find((airport: any) => this.normalizeString(airport.iata) == this.normalizeString(iata));
    return airport ? airport : [{ iata: '', airport: 'Estación de tren', city: '', country: '', continent: '' }];
  }

  async infoFlightPopover(array: []) {
    console.log('array: ', array);
    this.infoFlightArray = array;
    const popover = await this.popoverController.create({
      component: InfoFlightPage,
      cssClass: 'popoverStyle',
      //event: ev,
      translucent: true,
      componentProps: {},
      mode: 'ios'
    });
    return await popover.present();
  }
}

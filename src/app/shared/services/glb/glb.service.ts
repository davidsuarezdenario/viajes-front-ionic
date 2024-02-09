import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlbService {

  sesion: boolean = false;
  idCliente: string = "";
  userData: any = {};

  searchFrom: string = "";
  searchTo: string = "";
  selectAirportFrom: any = {};
  selectAirportTo: any = {};
  airports: any = [];

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

  constructor() { }
}

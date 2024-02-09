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

  constructor() { }
}

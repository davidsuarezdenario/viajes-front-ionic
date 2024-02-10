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

  selectedDateSalida: string = "";
  selectedDateRegreso: string = "";

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

  constructor() { 
    this.initCityFrom();
  }

  initCityFrom() {
    this.selectAirportFrom = {
      "id": "BOG",
      "int_id": 1179,
      "airport_int_id": 1179,
      "active": true,
      "code": "BOG",
      "icao": "SKBO",
      "name": "Aeropuerto Internacional El Dorado",
      "slug": "aeropuerto-internacional-el-dorado-bogota-colombia",
      "slug_en": "el-dorado-international-bogota-colombia",
      "alternative_names": [
        "El Dorado International"
      ],
      "rank": 24,
      "global_rank_dst": 22,
      "dst_popularity_score": 2210903,
      "timezone": "America/Bogota",
      "city": {
        "id": "bogota_co",
        "name": "Bogotá",
        "code": "BOG",
        "slug": "bogota-colombia",
        "country": {
          "id": "CO",
          "name": "Colombia",
          "slug": "colombia",
          "code": "CO"
        },
        "nearby_country": null,
        "region": {
          "id": "southern-america",
          "name": "Southern America",
          "slug": "southern-america"
        },
        "subdivision": null,
        "autonomous_territory": null,
        "continent": {
          "id": "south-america",
          "name": "Sudamérica",
          "slug": "south-america",
          "code": "SA"
        }
      },
      "location": {
        "lat": 4.701667,
        "lon": -74.146944
      },
      "alternative_departure_points": [
        {
          "id": "VVC",
          "distance": 125.96,
          "duration": 6627.2
        },
        {
          "id": "IBE",
          "distance": 189.35,
          "duration": 10506.3
        }
      ],
      "tags": [
        {
          "tag": "family fun",
          "month_to": -1,
          "month_from": -1
        },
        {
          "tag": "sightseeing",
          "month_to": -1,
          "month_from": -1
        }
      ],
      "providers": [
        1175,
        1277,
        1282
      ],
      "special": [
        {
          "id": "museo-del-oro-del-banco-de-la-republica_poi",
          "name": "Museo Del Oro Del Banco De La Republica",
          "slug": "museo-del-oro-del-banco-de-la-republica"
        }
      ],
      "tourist_region": [],
      "car_rentals": [
        {
          "provider_id": 1175,
          "providers_locations": [
            "250274",
            "617998",
            "924868"
          ]
        }
      ],
      "new_ground": false,
      "routing_priority": 0,
      "type": "airport"
    };
    this.searchFrom = `${this.selectAirportFrom.city.name}-${this.selectAirportFrom.code}`;
  }
}

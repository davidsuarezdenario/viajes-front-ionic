import { Injectable } from '@angular/core';
import { format } from 'date-fns';

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
  airports: any = [];
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

  testBookingResults() {
    this.bookingResults = [
      {
        "id": "049b1b174d410000474b7e3d_0|1b17049b4d4300004576c1e8_0",
        "flyFrom": "BOG",
        "flyTo": "SMR",
        "cityFrom": "Bogotá",
        "cityCodeFrom": "BOG",
        "cityTo": "Santa Marta",
        "cityCodeTo": "SMR",
        "countryFrom": {
          "code": "CO",
          "name": "Colombia"
        },
        "countryTo": {
          "code": "CO",
          "name": "Colombia"
        },
        "local_departure": "2024-02-24T18:43:00.000Z",
        "utc_departure": "2024-02-24T23:43:00.000Z",
        "local_arrival": "2024-02-24T20:15:00.000Z",
        "utc_arrival": "2024-02-25T01:15:00.000Z",
        "nightsInDest": 2,
        "quality": 180.502019,
        "distance": 714.51,
        "duration": {
          "departure": 5520,
          "return": 5340,
          "total": 10860
        },
        "price": 557705,
        "conversion": {
          "COP": 557705,
          "EUR": 132.36880603787435
        },
        "fare": {
          "adults": 557705,
          "children": 557705,
          "infants": 557705
        },
        "price_dropdown": {
          "base_fare": 487846.09979999997,
          "fees": 69858.90082633319
        },
        "bags_price": {
          "1": 36.387,
          "2": 94.97800000000001
        },
        "baglimit": {
          "hold_dimensions_sum": 158,
          "hold_height": 52,
          "hold_length": 78,
          "hold_weight": 20,
          "hold_width": 28,
          "personal_item_height": 35,
          "personal_item_length": 40,
          "personal_item_weight": 4,
          "personal_item_width": 20
        },
        "availability": {
          "seats": 9
        },
        "airlines": [
          "P5",
          "LA"
        ],
        "route": [
          {
            "id": "049b1b174d410000474b7e3d_0",
            "combination_id": "049b1b174d410000474b7e3d",
            "flyFrom": "BOG",
            "flyTo": "SMR",
            "cityFrom": "Bogotá",
            "cityCodeFrom": "BOG",
            "cityTo": "Santa Marta",
            "cityCodeTo": "SMR",
            "local_departure": "2024-02-24T18:43:00.000Z",
            "utc_departure": "2024-02-24T23:43:00.000Z",
            "local_arrival": "2024-02-24T20:15:00.000Z",
            "utc_arrival": "2024-02-25T01:15:00.000Z",
            "airline": "P5",
            "flight_no": 7284,
            "operating_carrier": "",
            "operating_flight_no": "",
            "fare_basis": "",
            "fare_category": "M",
            "fare_classes": "",
            "return": 0,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "1b17049b4d4300004576c1e8_0",
            "combination_id": "1b17049b4d4300004576c1e8",
            "flyFrom": "SMR",
            "flyTo": "BOG",
            "cityFrom": "Santa Marta",
            "cityCodeFrom": "SMR",
            "cityTo": "Bogotá",
            "cityCodeTo": "BOG",
            "local_departure": "2024-02-26T23:15:00.000Z",
            "utc_departure": "2024-02-27T04:15:00.000Z",
            "local_arrival": "2024-02-27T00:44:00.000Z",
            "utc_arrival": "2024-02-27T05:44:00.000Z",
            "airline": "LA",
            "flight_no": 4163,
            "operating_carrier": "LA",
            "operating_flight_no": "4163",
            "fare_basis": "O00QP5ZB",
            "fare_category": "M",
            "fare_classes": "",
            "return": 1,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          }
        ],
        "booking_token": "GMf8VBChbUVRzPxZv0jwRpgwAgkXauXZio29qGuTHbrXRs8WyfkBW-sdzkOqRNgMPicjUPethUD8lss3PxbSCfAH88dY1GFt0ATBIT_DVCGoA4VPw_bmlRr6yhOGmReJyhCjcXUlqKYRbvKsgECF1G4e6TOlztF_XvsUQsgXfTP2X6Y-HWLZvHBAjLiswhsF_9YHKWnk4a1flSuXkpX9auY8A6L97d_PDB6-zL2qy3LB3pR6l9fitJiz_-tbifhrSy5c7ImqI9JTvUmLKrQIae5q-P9B0Lko_BmYfFBTQyS0S0orpj2rMm0zc39Uft0c7zfaOzdKUCPCQekJQfv_QwGO7GxU1QrN1x8hJ-jOGAeG_-Z5NP0bHy2pWq4pYn9D-8kF7PFFTSBmvKxnfBTDw11AmQkA5Hfs_fy0hgtv7L6L9vlaSn5nOL__YTSe4o6Y2iC2ZrcPMU0t-6xrahoSIO_6niXWpZlseP0HeehvJwaNvIffDlR5zjvfzzHC3zZeSnWSEonarAS6toFzgxPgwCbH9GKGOG7IdtwGqSumih9QzwFIvcu_F4xMt17lUJVoLWPMuQuEZ8VHcfD8d8E2RvKgEp2sURINyO1BrCgpoass04KO29wRw4f51mBnQHJYPa2PqApqADBe7qsOf5GMYimp97FnYKFSskI7C_-Ztzw8CpOZ1U0C3JQH81eCBlRSdGrFsbt88IGisxBDrhfkKWg==",
        "facilitated_booking_available": true,
        "pnr_count": 2,
        "has_airport_change": false,
        "technical_stops": 0,
        "throw_away_ticketing": false,
        "hidden_city_ticketing": false,
        "virtual_interlining": false
      }
    ];
  }
}

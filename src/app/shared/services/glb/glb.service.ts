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
    const selectAirportFromMock = {
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
    this.bookingResults = [
      {
        "id": "049b00424d414d48863661a8_0|049b00424d414d48863661a8_1|049b00424d414d48863661a8_2|004210e84d460000931c6d3c_0|10e80a224d460000019b98e4_0|0a22049b4d460000cf930901_0|049b00424d414d48863661a8_3|049b00424d414d48863661a8_4",
        "flyFrom": "BOG",
        "flyTo": "BER",
        "cityFrom": "Bogotá",
        "cityCodeFrom": "BOG",
        "cityTo": "Berlín",
        "cityCodeTo": "BER",
        "countryFrom": {
          "code": "CO",
          "name": "Colombia"
        },
        "countryTo": {
          "code": "DE",
          "name": "Alemania"
        },
        "local_departure": "2024-02-24T16:05:00.000Z",
        "utc_departure": "2024-02-24T21:05:00.000Z",
        "local_arrival": "2024-02-25T13:45:00.000Z",
        "utc_arrival": "2024-02-25T12:45:00.000Z",
        "nightsInDest": 4,
        "quality": 2219.182525,
        "distance": 9444.82,
        "duration": {
          "departure": 56400,
          "return": 71700,
          "total": 128100
        },
        "price": 8141926,
        "conversion": {
          "COP": 8141926,
          "EUR": 1910.5166295434174
        },
        "fare": {
          "adults": 8141926,
          "children": 8141926,
          "infants": 8141926
        },
        "price_dropdown": {
          "base_fare": 8563827.9419,
          "fees": -421901.940834
        },
        "bags_price": {
          "1": 495.287,
          "2": 1201.187
        },
        "baglimit": {
          "hand_height": 35,
          "hand_length": 55,
          "hand_weight": 10,
          "hand_width": 25,
          "hold_dimensions_sum": 158,
          "hold_height": 52,
          "hold_length": 78,
          "hold_weight": 15,
          "hold_width": 28,
          "personal_item_height": 30,
          "personal_item_length": 40,
          "personal_item_weight": 2,
          "personal_item_width": 15
        },
        "availability": {
          "seats": 1
        },
        "airlines": [
          "UX",
          "AV",
          "KL",
          "U2"
        ],
        "route": [
          {
            "id": "049b00424d414d48863661a8_0",
            "combination_id": "049b00424d414d48863661a8",
            "flyFrom": "BOG",
            "flyTo": "CTG",
            "cityFrom": "Bogotá",
            "cityCodeFrom": "BOG",
            "cityTo": "Cartagena de Indias",
            "cityCodeTo": "CTG",
            "local_departure": "2024-02-24T16:05:00.000Z",
            "utc_departure": "2024-02-24T21:05:00.000Z",
            "local_arrival": "2024-02-24T17:30:00.000Z",
            "utc_arrival": "2024-02-24T22:30:00.000Z",
            "airline": "KL",
            "flight_no": 749,
            "operating_carrier": "KL",
            "operating_flight_no": "749",
            "fare_basis": "HRL0JBLA",
            "fare_category": "M",
            "fare_classes": "H",
            "return": 0,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft",
            "following_technical_stop": true
          },
          {
            "id": "049b00424d414d48863661a8_1",
            "combination_id": "049b00424d414d48863661a8",
            "flyFrom": "CTG",
            "flyTo": "AMS",
            "cityFrom": "Cartagena de Indias",
            "cityCodeFrom": "CTG",
            "cityTo": "Ámsterdam",
            "cityCodeTo": "AMS",
            "local_departure": "2024-02-24T18:45:00.000Z",
            "utc_departure": "2024-02-24T23:45:00.000Z",
            "local_arrival": "2024-02-25T10:35:00.000Z",
            "utc_arrival": "2024-02-25T09:35:00.000Z",
            "airline": "KL",
            "flight_no": 749,
            "operating_carrier": "KL",
            "operating_flight_no": "749",
            "fare_basis": "HRL0JBLA",
            "fare_category": "M",
            "fare_classes": "H",
            "return": 0,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "049b00424d414d48863661a8_2",
            "combination_id": "049b00424d414d48863661a8",
            "flyFrom": "AMS",
            "flyTo": "BER",
            "cityFrom": "Ámsterdam",
            "cityCodeFrom": "AMS",
            "cityTo": "Berlín",
            "cityCodeTo": "BER",
            "local_departure": "2024-02-25T12:30:00.000Z",
            "utc_departure": "2024-02-25T11:30:00.000Z",
            "local_arrival": "2024-02-25T13:45:00.000Z",
            "utc_arrival": "2024-02-25T12:45:00.000Z",
            "airline": "KL",
            "flight_no": 1825,
            "operating_carrier": "KL",
            "operating_flight_no": "1825",
            "fare_basis": "HRL0JBLA",
            "fare_category": "M",
            "fare_classes": "K",
            "return": 0,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "004210e84d460000931c6d3c_0",
            "combination_id": "004210e84d460000931c6d3c",
            "flyFrom": "BER",
            "flyTo": "AMS",
            "cityFrom": "Berlín",
            "cityCodeFrom": "BER",
            "cityTo": "Ámsterdam",
            "cityCodeTo": "AMS",
            "local_departure": "2024-02-29T07:10:00.000Z",
            "utc_departure": "2024-02-29T06:10:00.000Z",
            "local_arrival": "2024-02-29T08:40:00.000Z",
            "utc_arrival": "2024-02-29T07:40:00.000Z",
            "airline": "U2",
            "flight_no": 5281,
            "operating_carrier": "EC",
            "operating_flight_no": "",
            "fare_basis": "",
            "fare_category": "M",
            "fare_classes": "",
            "return": 1,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "10e80a224d460000019b98e4_0",
            "combination_id": "10e80a224d460000019b98e4",
            "flyFrom": "AMS",
            "flyTo": "MAD",
            "cityFrom": "Ámsterdam",
            "cityCodeFrom": "AMS",
            "cityTo": "Madrid",
            "cityCodeTo": "MAD",
            "local_departure": "2024-02-29T11:00:00.000Z",
            "utc_departure": "2024-02-29T10:00:00.000Z",
            "local_arrival": "2024-02-29T13:40:00.000Z",
            "utc_arrival": "2024-02-29T12:40:00.000Z",
            "airline": "UX",
            "flight_no": 1098,
            "operating_carrier": "UX",
            "operating_flight_no": "1098",
            "fare_basis": "AYYO5L",
            "fare_category": "M",
            "fare_classes": "A",
            "return": 1,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "0a22049b4d460000cf930901_0",
            "combination_id": "0a22049b4d460000cf930901",
            "flyFrom": "MAD",
            "flyTo": "BOG",
            "cityFrom": "Madrid",
            "cityCodeFrom": "MAD",
            "cityTo": "Bogotá",
            "cityCodeTo": "BOG",
            "local_departure": "2024-02-29T16:40:00.000Z",
            "utc_departure": "2024-02-29T15:40:00.000Z",
            "local_arrival": "2024-02-29T21:05:00.000Z",
            "utc_arrival": "2024-03-01T02:05:00.000Z",
            "airline": "AV",
            "flight_no": 11,
            "operating_carrier": "AV",
            "operating_flight_no": "11",
            "fare_basis": "SAOB1BRR",
            "fare_category": "M",
            "fare_classes": "S",
            "return": 1,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          }
        ],
        "booking_token": "G97-U1KU6oCxL_62ba9PaguBUJmhse7KhQvW2rIimj6PWURaWfnQOkAn57o-kHWJRkmXkYt98z2O3aLrG9nnv14VN8n6WtjXYDXBZfGxnNWQstTgy0LQQpuj0XVxKrbxSo-hX2lPbZpuepEtTGuZOR3THdtisvPq7hdF0ZDIlo8PJRbPDp_nehUKU0M3O79kVczkGUg4JJDmkAQV6YaelbC4IKMz_YnDSpD1xtz-paeM1hTIv1K-vipGVNLHwJWzq-UmXEuNQWWj0HD_bYaZPMXlLckd7rE7QDCWwUThwWfsHl4_uQYrZXBQP7ZlkrYD9dDZGeIQ-0TSYHns5pZfCuxxDKgK-9jrGIGD7x5Z0GplizzCBJDX_C5AdD2xmnkjS7zGc4j4cOvlDE0XlWrwr9wK6uEeUMdv33GqEeJ1vE1G4QITGgVLoZgeggSx8vjjg5byKlrT06l4tpihOurwX7-BNBV_jM2z2zpmn2HulJh8Vl5N6EXzcb8kZuIyX0Aq98T_GpaP1IiFsAcOm3pLsPTazLG3hlSJjYxuygvWUcJaxAIMvczykcZ0kgcSskQ1rE1BBDg-nGxZYBo8ynLADt2eT4DN1Qxy-WUIM-_HNA3OhTUNa3Ulo-0pJS0QrpCoqGV1qeZH2tywN-fJsYuO3ONsnuvaHEpy6lrQBcNH2_TrRuFoOZGqtdUClwzBht_GkCGIu7PMY3Aery6EnEIo2NhZLyw2XpznuqoDeYw0pB0q05k02aUxr3S49mjKvQPcQQHtL6jMvsFPVdyu55rlYChvLPedJOHMAEzI6jYkMIzrFyztNn2LO4B7tKlzP62lFff-3p9Jr-lfYt9dH7QG8e_qNI7j9TGsgKsJVp3g6kvaJwUGWNOE6sd1ohT3NG4Ff9EQn8EjRFGrzMcO568Oz5R_cvvLSi8DYl3HG-i0oxke8CpmHDxTwWMS9AAsjk9xVKZvtRKRI3I5DgcYO8k14F5IkfUkw3Wl5Bvkt6SLjYkw=",
        "facilitated_booking_available": true,
        "pnr_count": 4,
        "has_airport_change": false,
        "technical_stops": 1,
        "throw_away_ticketing": true,
        "hidden_city_ticketing": false,
        "virtual_interlining": true
      },
      {
        "id": "049b0f6b4d3f00003b1c25f0_0|0f6b0a7c4d3f000066215fb6_0|25c30a224d450000c115a577_0|0a22049b4d450000a420b7d3_0",
        "flyFrom": "BOG",
        "flyTo": "ORY",
        "cityFrom": "Bogotá",
        "cityCodeFrom": "BOG",
        "cityTo": "París",
        "cityCodeTo": "PAR",
        "countryFrom": {
          "code": "CO",
          "name": "Colombia"
        },
        "countryTo": {
          "code": "FR",
          "name": "Francia"
        },
        "local_departure": "2024-02-22T11:00:00.000Z",
        "utc_departure": "2024-02-22T16:00:00.000Z",
        "local_arrival": "2024-02-23T11:40:00.000Z",
        "utc_arrival": "2024-02-23T10:40:00.000Z",
        "nightsInDest": 5,
        "quality": 1504.631266,
        "distance": 8638.03,
        "duration": {
          "departure": 67200,
          "return": 72000,
          "total": 139200
        },
        "price": 4966838,
        "conversion": {
          "COP": 4966838,
          "EUR": 1171.2987657582971
        },
        "fare": {
          "adults": 4966838,
          "children": 4966838,
          "infants": 4966838
        },
        "price_dropdown": {
          "base_fare": 5038925.711,
          "fees": -72087.710214
        },
        "bags_price": {
          "1": 323.388
        },
        "baglimit": {
          "hold_dimensions_sum": 158,
          "hold_height": 52,
          "hold_length": 78,
          "hold_weight": 15,
          "hold_width": 28,
          "personal_item_height": 30,
          "personal_item_length": 40,
          "personal_item_weight": 4,
          "personal_item_width": 20
        },
        "availability": {
          "seats": 1
        },
        "airlines": [
          "LA",
          "BF",
          "U2",
          "AV"
        ],
        "route": [
          {
            "id": "049b0f6b4d3f00003b1c25f0_0",
            "combination_id": "049b0f6b4d3f00003b1c25f0",
            "flyFrom": "BOG",
            "flyTo": "MIA",
            "cityFrom": "Bogotá",
            "cityCodeFrom": "BOG",
            "cityTo": "Miami",
            "cityCodeTo": "MIA",
            "local_departure": "2024-02-22T11:00:00.000Z",
            "utc_departure": "2024-02-22T16:00:00.000Z",
            "local_arrival": "2024-02-22T14:55:00.000Z",
            "utc_arrival": "2024-02-22T19:55:00.000Z",
            "airline": "LA",
            "flight_no": 4402,
            "operating_carrier": "LA",
            "operating_flight_no": "4402",
            "fare_basis": "NLESLZ0K",
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
            "id": "0f6b0a7c4d3f000066215fb6_0",
            "combination_id": "0f6b0a7c4d3f000066215fb6",
            "flyFrom": "MIA",
            "flyTo": "ORY",
            "cityFrom": "Miami",
            "cityCodeFrom": "MIA",
            "cityTo": "París",
            "cityCodeTo": "PAR",
            "local_departure": "2024-02-22T21:00:00.000Z",
            "utc_departure": "2024-02-23T02:00:00.000Z",
            "local_arrival": "2024-02-23T11:40:00.000Z",
            "utc_arrival": "2024-02-23T10:40:00.000Z",
            "airline": "BF",
            "flight_no": 743,
            "operating_carrier": "BF",
            "operating_flight_no": "743",
            "fare_basis": "HBCOWUS",
            "fare_category": "M",
            "fare_classes": "H",
            "return": 0,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "25c30a224d450000c115a577_0",
            "combination_id": "25c30a224d450000c115a577",
            "flyFrom": "CDG",
            "flyTo": "MAD",
            "cityFrom": "París",
            "cityCodeFrom": "PAR",
            "cityTo": "Madrid",
            "cityCodeTo": "MAD",
            "local_departure": "2024-02-28T07:05:00.000Z",
            "utc_departure": "2024-02-28T06:05:00.000Z",
            "local_arrival": "2024-02-28T09:20:00.000Z",
            "utc_arrival": "2024-02-28T08:20:00.000Z",
            "airline": "U2",
            "flight_no": 4581,
            "operating_carrier": "EC",
            "operating_flight_no": "",
            "fare_basis": "",
            "fare_category": "M",
            "fare_classes": "",
            "return": 1,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "0a22049b4d450000a420b7d3_0",
            "combination_id": "0a22049b4d450000a420b7d3",
            "flyFrom": "MAD",
            "flyTo": "BOG",
            "cityFrom": "Madrid",
            "cityCodeFrom": "MAD",
            "cityTo": "Bogotá",
            "cityCodeTo": "BOG",
            "local_departure": "2024-02-28T16:40:00.000Z",
            "utc_departure": "2024-02-28T15:40:00.000Z",
            "local_arrival": "2024-02-28T21:05:00.000Z",
            "utc_arrival": "2024-02-29T02:05:00.000Z",
            "airline": "AV",
            "flight_no": 11,
            "operating_carrier": "AV",
            "operating_flight_no": "11",
            "fare_basis": "UZOB1BR9",
            "fare_category": "M",
            "fare_classes": "U",
            "return": 1,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          }
        ],
        "booking_token": "G6VIZRP2TtpNss-L5tRtv7YbLbvvPH--hdRDu82YWFLrZ3jVYwtWshcbgHn85PkBJ7ivH9QBxESmMhp0-i0fUVhwcWyqDWjXjHMgyZpML3c-Y70jpW2BC4laNFjhDnYxFDB6VNHHpoR3vrWAw7jb_Df32C1qsZAnaJOaHxRWDDaMErmBzGYUtLWefg5CZHkEdqF5xMNurAIP76L4migOg_KwwBv6e9CsEItHwlELfqNkT5k8UcOj60ESYhABY8fcfHDS_n0yPZzdzGsrfRMBbSniohehy39AP_gwQe6VAa-vNM1aWEKPs6Go87PO8GcrxBjyBPQUpsLnqQ0SUe26YB2D5t22vG1EccWbphURfFSD-rljqmsiGh37f5UHDgySP9aQ0jj7uKMJFPSzB7io2krGKcMIi4-2Cj8dc9UBgWj9DrrRpg77YC7rqgabIT6tcmTxq62BcfOGitiEFyVNZ0Skes7eBeC0wZc6fBeqraaOS6wPbo5UFqT4ELiQSay2YalUfAS0mBHE2bM203BNT8zHBklfF_M6mnUOCpYo_3Fw5Om_mZQQHslKxX4JfMcYC28ZHlkCWIW_1lQrrcCcUqldzwCTJH2pqi05G6AEdSBP0AdaRVdW6gklfrEwPehT2PhIwYhAJbQwM0FPL_eSaF-yXFRK28GT3X8GubFJI-nHo437LUVQS-q_7UO114Af5kIjhKvvr9jbMMJa_yGP26a2riEOM3ivBwG_qpQgTXdV847b1ncGk5IAqekhrPv3GAiY4Dj3_csO_dwRfK31iq1Q8BqbbjyIQqEtLsw2dG4CQ1JIyHjfhhT4HG-3U_bzruLj1Plxli5t_AKzuOs37biT-XdUw1JuC5NXq8oy5wldbyDMAAMDU1JZtVTtOpArw",
        "facilitated_booking_available": true,
        "pnr_count": 4,
        "has_airport_change": false,
        "technical_stops": 0,
        "throw_away_ticketing": false,
        "hidden_city_ticketing": false,
        "virtual_interlining": true
      },
      {
        "id": "049b0f6b4d3f00003b1c25f0_0|0f6b0a7c4d3f000066215fb6_0|25c30a224d450000c115a577_0|0a22049b4d450000a420b7d3_0",
        "flyFrom": "BOG",
        "flyTo": "ORY",
        "cityFrom": "Bogotá",
        "cityCodeFrom": "BOG",
        "cityTo": "París",
        "cityCodeTo": "PAR",
        "countryFrom": {
          "code": "CO",
          "name": "Colombia"
        },
        "countryTo": {
          "code": "FR",
          "name": "Francia"
        },
        "local_departure": "2024-02-22T11:00:00.000Z",
        "utc_departure": "2024-02-22T16:00:00.000Z",
        "local_arrival": "2024-02-23T11:40:00.000Z",
        "utc_arrival": "2024-02-23T10:40:00.000Z",
        "nightsInDest": 5,
        "quality": 1504.631266,
        "distance": 8638.03,
        "duration": {
          "departure": 67200,
          "return": 72000,
          "total": 139200
        },
        "price": 4966838,
        "conversion": {
          "COP": 4966838,
          "EUR": 1171.2987657582971
        },
        "fare": {
          "adults": 4966838,
          "children": 4966838,
          "infants": 4966838
        },
        "price_dropdown": {
          "base_fare": 5038925.711,
          "fees": -72087.710214
        },
        "bags_price": {
          "1": 323.388
        },
        "baglimit": {
          "hold_dimensions_sum": 158,
          "hold_height": 52,
          "hold_length": 78,
          "hold_weight": 15,
          "hold_width": 28,
          "personal_item_height": 30,
          "personal_item_length": 40,
          "personal_item_weight": 4,
          "personal_item_width": 20
        },
        "availability": {
          "seats": 1
        },
        "airlines": [
          "LA",
          "BF",
          "U2",
          "AV"
        ],
        "route": [
          {
            "id": "049b0f6b4d3f00003b1c25f0_0",
            "combination_id": "049b0f6b4d3f00003b1c25f0",
            "flyFrom": "BOG",
            "flyTo": "MIA",
            "cityFrom": "Bogotá",
            "cityCodeFrom": "BOG",
            "cityTo": "Miami",
            "cityCodeTo": "MIA",
            "local_departure": "2024-02-22T11:00:00.000Z",
            "utc_departure": "2024-02-22T16:00:00.000Z",
            "local_arrival": "2024-02-22T14:55:00.000Z",
            "utc_arrival": "2024-02-22T19:55:00.000Z",
            "airline": "LA",
            "flight_no": 4402,
            "operating_carrier": "LA",
            "operating_flight_no": "4402",
            "fare_basis": "NLESLZ0K",
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
            "id": "0f6b0a7c4d3f000066215fb6_0",
            "combination_id": "0f6b0a7c4d3f000066215fb6",
            "flyFrom": "MIA",
            "flyTo": "ORY",
            "cityFrom": "Miami",
            "cityCodeFrom": "MIA",
            "cityTo": "París",
            "cityCodeTo": "PAR",
            "local_departure": "2024-02-22T21:00:00.000Z",
            "utc_departure": "2024-02-23T02:00:00.000Z",
            "local_arrival": "2024-02-23T11:40:00.000Z",
            "utc_arrival": "2024-02-23T10:40:00.000Z",
            "airline": "BF",
            "flight_no": 743,
            "operating_carrier": "BF",
            "operating_flight_no": "743",
            "fare_basis": "HBCOWUS",
            "fare_category": "M",
            "fare_classes": "H",
            "return": 0,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "25c30a224d450000c115a577_0",
            "combination_id": "25c30a224d450000c115a577",
            "flyFrom": "CDG",
            "flyTo": "MAD",
            "cityFrom": "París",
            "cityCodeFrom": "PAR",
            "cityTo": "Madrid",
            "cityCodeTo": "MAD",
            "local_departure": "2024-02-28T07:05:00.000Z",
            "utc_departure": "2024-02-28T06:05:00.000Z",
            "local_arrival": "2024-02-28T09:20:00.000Z",
            "utc_arrival": "2024-02-28T08:20:00.000Z",
            "airline": "U2",
            "flight_no": 4581,
            "operating_carrier": "EC",
            "operating_flight_no": "",
            "fare_basis": "",
            "fare_category": "M",
            "fare_classes": "",
            "return": 1,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "0a22049b4d450000a420b7d3_0",
            "combination_id": "0a22049b4d450000a420b7d3",
            "flyFrom": "MAD",
            "flyTo": "BOG",
            "cityFrom": "Madrid",
            "cityCodeFrom": "MAD",
            "cityTo": "Bogotá",
            "cityCodeTo": "BOG",
            "local_departure": "2024-02-28T16:40:00.000Z",
            "utc_departure": "2024-02-28T15:40:00.000Z",
            "local_arrival": "2024-02-28T21:05:00.000Z",
            "utc_arrival": "2024-02-29T02:05:00.000Z",
            "airline": "AV",
            "flight_no": 11,
            "operating_carrier": "AV",
            "operating_flight_no": "11",
            "fare_basis": "UZOB1BR9",
            "fare_category": "M",
            "fare_classes": "U",
            "return": 1,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          }
        ],
        "booking_token": "G6VIZRP2TtpNss-L5tRtv7YbLbvvPH--hdRDu82YWFLrZ3jVYwtWshcbgHn85PkBJ7ivH9QBxESmMhp0-i0fUVhwcWyqDWjXjHMgyZpML3c-Y70jpW2BC4laNFjhDnYxFDB6VNHHpoR3vrWAw7jb_Df32C1qsZAnaJOaHxRWDDaMErmBzGYUtLWefg5CZHkEdqF5xMNurAIP76L4migOg_KwwBv6e9CsEItHwlELfqNkT5k8UcOj60ESYhABY8fcfHDS_n0yPZzdzGsrfRMBbSniohehy39AP_gwQe6VAa-vNM1aWEKPs6Go87PO8GcrxBjyBPQUpsLnqQ0SUe26YB2D5t22vG1EccWbphURfFSD-rljqmsiGh37f5UHDgySP9aQ0jj7uKMJFPSzB7io2krGKcMIi4-2Cj8dc9UBgWj9DrrRpg77YC7rqgabIT6tcmTxq62BcfOGitiEFyVNZ0Skes7eBeC0wZc6fBeqraaOS6wPbo5UFqT4ELiQSay2YalUfAS0mBHE2bM203BNT8zHBklfF_M6mnUOCpYo_3Fw5Om_mZQQHslKxX4JfMcYC28ZHlkCWIW_1lQrrcCcUqldzwCTJH2pqi05G6AEdSBP0AdaRVdW6gklfrEwPehT2PhIwYhAJbQwM0FPL_eSaF-yXFRK28GT3X8GubFJI-nHo437LUVQS-q_7UO114Af5kIjhKvvr9jbMMJa_yGP26a2riEOM3ivBwG_qpQgTXdV847b1ncGk5IAqekhrPv3GAiY4Dj3_csO_dwRfK31iq1Q8BqbbjyIQqEtLsw2dG4CQ1JIyHjfhhT4HG-3U_bzruLj1Plxli5t_AKzuOs37biT-XdUw1JuC5NXq8oy5wldbyDMAAMDU1JZtVTtOpArw",
        "facilitated_booking_available": true,
        "pnr_count": 4,
        "has_airport_change": false,
        "technical_stops": 0,
        "throw_away_ticketing": false,
        "hidden_city_ticketing": false,
        "virtual_interlining": true
      },
      {
        "id": "049b0f6b4d3f00003b1c25f0_0|0f6b0a7c4d3f000066215fb6_0|25c30a224d450000c115a577_0|0a22049b4d450000a420b7d3_0",
        "flyFrom": "BOG",
        "flyTo": "ORY",
        "cityFrom": "Bogotá",
        "cityCodeFrom": "BOG",
        "cityTo": "París",
        "cityCodeTo": "PAR",
        "countryFrom": {
          "code": "CO",
          "name": "Colombia"
        },
        "countryTo": {
          "code": "FR",
          "name": "Francia"
        },
        "local_departure": "2024-02-22T11:00:00.000Z",
        "utc_departure": "2024-02-22T16:00:00.000Z",
        "local_arrival": "2024-02-23T11:40:00.000Z",
        "utc_arrival": "2024-02-23T10:40:00.000Z",
        "nightsInDest": 5,
        "quality": 1504.631266,
        "distance": 8638.03,
        "duration": {
          "departure": 67200,
          "return": 72000,
          "total": 139200
        },
        "price": 4966838,
        "conversion": {
          "COP": 4966838,
          "EUR": 1171.2987657582971
        },
        "fare": {
          "adults": 4966838,
          "children": 4966838,
          "infants": 4966838
        },
        "price_dropdown": {
          "base_fare": 5038925.711,
          "fees": -72087.710214
        },
        "bags_price": {
          "1": 323.388
        },
        "baglimit": {
          "hold_dimensions_sum": 158,
          "hold_height": 52,
          "hold_length": 78,
          "hold_weight": 15,
          "hold_width": 28,
          "personal_item_height": 30,
          "personal_item_length": 40,
          "personal_item_weight": 4,
          "personal_item_width": 20
        },
        "availability": {
          "seats": 1
        },
        "airlines": [
          "LA",
          "BF",
          "U2",
          "AV"
        ],
        "route": [
          {
            "id": "049b0f6b4d3f00003b1c25f0_0",
            "combination_id": "049b0f6b4d3f00003b1c25f0",
            "flyFrom": "BOG",
            "flyTo": "MIA",
            "cityFrom": "Bogotá",
            "cityCodeFrom": "BOG",
            "cityTo": "Miami",
            "cityCodeTo": "MIA",
            "local_departure": "2024-02-22T11:00:00.000Z",
            "utc_departure": "2024-02-22T16:00:00.000Z",
            "local_arrival": "2024-02-22T14:55:00.000Z",
            "utc_arrival": "2024-02-22T19:55:00.000Z",
            "airline": "LA",
            "flight_no": 4402,
            "operating_carrier": "LA",
            "operating_flight_no": "4402",
            "fare_basis": "NLESLZ0K",
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
            "id": "0f6b0a7c4d3f000066215fb6_0",
            "combination_id": "0f6b0a7c4d3f000066215fb6",
            "flyFrom": "MIA",
            "flyTo": "ORY",
            "cityFrom": "Miami",
            "cityCodeFrom": "MIA",
            "cityTo": "París",
            "cityCodeTo": "PAR",
            "local_departure": "2024-02-22T21:00:00.000Z",
            "utc_departure": "2024-02-23T02:00:00.000Z",
            "local_arrival": "2024-02-23T11:40:00.000Z",
            "utc_arrival": "2024-02-23T10:40:00.000Z",
            "airline": "BF",
            "flight_no": 743,
            "operating_carrier": "BF",
            "operating_flight_no": "743",
            "fare_basis": "HBCOWUS",
            "fare_category": "M",
            "fare_classes": "H",
            "return": 0,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "25c30a224d450000c115a577_0",
            "combination_id": "25c30a224d450000c115a577",
            "flyFrom": "CDG",
            "flyTo": "MAD",
            "cityFrom": "París",
            "cityCodeFrom": "PAR",
            "cityTo": "Madrid",
            "cityCodeTo": "MAD",
            "local_departure": "2024-02-28T07:05:00.000Z",
            "utc_departure": "2024-02-28T06:05:00.000Z",
            "local_arrival": "2024-02-28T09:20:00.000Z",
            "utc_arrival": "2024-02-28T08:20:00.000Z",
            "airline": "U2",
            "flight_no": 4581,
            "operating_carrier": "EC",
            "operating_flight_no": "",
            "fare_basis": "",
            "fare_category": "M",
            "fare_classes": "",
            "return": 1,
            "bags_recheck_required": false,
            "vi_connection": false,
            "guarantee": false,
            "equipment": null,
            "vehicle_type": "aircraft"
          },
          {
            "id": "0a22049b4d450000a420b7d3_0",
            "combination_id": "0a22049b4d450000a420b7d3",
            "flyFrom": "MAD",
            "flyTo": "BOG",
            "cityFrom": "Madrid",
            "cityCodeFrom": "MAD",
            "cityTo": "Bogotá",
            "cityCodeTo": "BOG",
            "local_departure": "2024-02-28T16:40:00.000Z",
            "utc_departure": "2024-02-28T15:40:00.000Z",
            "local_arrival": "2024-02-28T21:05:00.000Z",
            "utc_arrival": "2024-02-29T02:05:00.000Z",
            "airline": "AV",
            "flight_no": 11,
            "operating_carrier": "AV",
            "operating_flight_no": "11",
            "fare_basis": "UZOB1BR9",
            "fare_category": "M",
            "fare_classes": "U",
            "return": 1,
            "bags_recheck_required": true,
            "vi_connection": true,
            "guarantee": true,
            "equipment": null,
            "vehicle_type": "aircraft"
          }
        ],
        "booking_token": "G6VIZRP2TtpNss-L5tRtv7YbLbvvPH--hdRDu82YWFLrZ3jVYwtWshcbgHn85PkBJ7ivH9QBxESmMhp0-i0fUVhwcWyqDWjXjHMgyZpML3c-Y70jpW2BC4laNFjhDnYxFDB6VNHHpoR3vrWAw7jb_Df32C1qsZAnaJOaHxRWDDaMErmBzGYUtLWefg5CZHkEdqF5xMNurAIP76L4migOg_KwwBv6e9CsEItHwlELfqNkT5k8UcOj60ESYhABY8fcfHDS_n0yPZzdzGsrfRMBbSniohehy39AP_gwQe6VAa-vNM1aWEKPs6Go87PO8GcrxBjyBPQUpsLnqQ0SUe26YB2D5t22vG1EccWbphURfFSD-rljqmsiGh37f5UHDgySP9aQ0jj7uKMJFPSzB7io2krGKcMIi4-2Cj8dc9UBgWj9DrrRpg77YC7rqgabIT6tcmTxq62BcfOGitiEFyVNZ0Skes7eBeC0wZc6fBeqraaOS6wPbo5UFqT4ELiQSay2YalUfAS0mBHE2bM203BNT8zHBklfF_M6mnUOCpYo_3Fw5Om_mZQQHslKxX4JfMcYC28ZHlkCWIW_1lQrrcCcUqldzwCTJH2pqi05G6AEdSBP0AdaRVdW6gklfrEwPehT2PhIwYhAJbQwM0FPL_eSaF-yXFRK28GT3X8GubFJI-nHo437LUVQS-q_7UO114Af5kIjhKvvr9jbMMJa_yGP26a2riEOM3ivBwG_qpQgTXdV847b1ncGk5IAqekhrPv3GAiY4Dj3_csO_dwRfK31iq1Q8BqbbjyIQqEtLsw2dG4CQ1JIyHjfhhT4HG-3U_bzruLj1Plxli5t_AKzuOs37biT-XdUw1JuC5NXq8oy5wldbyDMAAMDU1JZtVTtOpArw",
        "facilitated_booking_available": true,
        "pnr_count": 4,
        "has_airport_change": false,
        "technical_stops": 0,
        "throw_away_ticketing": false,
        "hidden_city_ticketing": false,
        "virtual_interlining": true
      }
    ];
  }
}

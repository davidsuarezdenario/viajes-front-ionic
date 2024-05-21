import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { GlbService } from '../glb/glb.service';
import { AlertMainService } from '../alert-main/alert-main.service';
import { format, parseISO, formatISO } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class SearchMainService {

  constructor(
    private apiService: ApiService,
    private glbService: GlbService,
    private alertMain: AlertMainService,
  ) { }

  totalBagsHoldToDistribute: number = 0;
  bagsHoldDistributionFunc(persons: number): string {
    const maxBagsPerAdult = 2;
    let bagDistribution = Array(persons).fill(0);
    let totalBags = this.totalBagsHoldToDistribute;
    for (let i = 0; i < totalBags; i++) {
      if (bagDistribution[i % persons] < maxBagsPerAdult) {
        bagDistribution[i % persons]++;
        this.totalBagsHoldToDistribute--;
      }
    }
    return bagDistribution.join(',');
  }

  totalBagsHandToDistribute: number = 0;
  bagsHandDistributionFunc(persons: number): string {
    const maxBagsPerAdult = 1;
    let bagDistribution = Array(persons).fill(0);
    let totalBags = this.totalBagsHandToDistribute;
    for (let i = 0; i < totalBags; i++) {
      if (bagDistribution[i % persons] < maxBagsPerAdult) {
        bagDistribution[i % persons]++;
        this.totalBagsHandToDistribute--;
      }
    }
    return bagDistribution.join(',');
  }

  async explorar() {
    console.log('trips: ', this.glbService.trips);
    console.log('clase: ', this.glbService.clase);
    console.log('passengers: ', this.glbService.passengers);
    console.log('bags: ', this.glbService.bags);
    console.log('airport from: ', this.glbService.selectAirportFrom);
    console.log('airport to: ', this.glbService.selectAirportTo);
    console.log('date from: ', this.glbService.dateFrom);
    console.log('date to: ', this.glbService.dateTo);
    this.totalBagsHoldToDistribute = this.glbService.bags.hold;
    this.totalBagsHandToDistribute = this.glbService.bags.hand;
    const body: any = {
      "data": {
        "soapenv:Body": {
          "Fare_MasterPricerTravelBoardSearch": [
            {
              "numberOfUnit": [
                {
                  "unitNumberDetail": [
                    { "numberOfUnits": ["2"], "typeOfUnit": ["PX"] },
                    { "numberOfUnits": ["100"], "typeOfUnit": ["RC"] }
                  ]
                }
              ],
              "paxReference": [{ "ptc": ["ADT"], "traveller": [{ "ref": ["1"] }, { "ref": ["2"] }] }],
              "fareOptions": [{ "pricingTickInfo": [{ "pricingTicketing": [{ "priceType": ["ET", "RP", "RU", "TAC", "XND"] }] }] }],
              "travelFlightInfo": [{ "flightDetail": [{ "flightType": ["N"] }] }],
              "itinerary": [
                {
                  "requestedSegmentRef": [{ "segRef": ["1"] }],
                  "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode], "airportCityQualifier": ["C"] }] }],
                  "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode], "airportCityQualifier": ["C"] }] }],
                  "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }]
                },
                this.glbService.trips == 'idaVuelta' ? { "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode], "airportCityQualifier": ["C"] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode], "airportCityQualifier": ["C"] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateRegresoStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] } : false
              ]
            }
          ]
        }
      }
    };
    console.log('body: ', body);
    if (!this.validators()) return;
    this.glbService.bookingResults = [];
    try {
      this.glbService.bookingloading = true;
      const bookingResponse: any = await this.apiService.post('/travel/booking', body);
      console.log('bookingResponse: ', bookingResponse);
      /* if (bookingResponse.data.error) {
        this.alertMain.present('Error', 'Al consultar vuelos', bookingResponse.data.error);
        return;
      }
      if (bookingResponse.data.data.length > 0) {
        this.glbService.bookingResults = bookingResponse.data.data;
        this.glbService.firstSearch = false;
        return;
      } */
      this.alertMain.present('Ups', 'No se encontraron vuelos', 'Intenta con otros parametros de busqueda.');
    } catch (e) {
      console.error('error bookingResponse: ', e);
      this.alertMain.present('Error', 'Al consultar vuelos', JSON.stringify(e));
    } finally {
      this.glbService.bookingloading = false;
    }
  }

  validators(): boolean {
    const conditions = [
      {
        condition: !this.glbService.selectAirportFrom.iataCode,
        message: 'Seleccione un aeropuerto de origen'
      },
      {
        condition: !this.glbService.selectAirportTo.iataCode,
        message: 'Seleccione un aeropuerto de destino'
      },
      {
        condition: !this.glbService.dateFrom,
        message: 'Seleccione una fecha de salida'
      },
      {
        condition: this.glbService.totalPassengers <= 0,
        message: 'Seleccione al menos un pasajero'
      }
    ];

    for (let item of conditions) {
      if (item.condition) {
        this.alertMain.present('Error', 'Datos incompletos', item.message);
        return false;
      }
    }

    return true;
  }

}

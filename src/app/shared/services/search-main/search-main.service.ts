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
    this.totalBagsHoldToDistribute = this.glbService.bags.hold; this.totalBagsHandToDistribute = this.glbService.bags.hand;
    /* const requestedSegmentRef = this.glbService.trips == 'idaVuelta' ? [{ requestedSegmentRef: [{ segRef: ["1"] }], departureLocalization: [{ departurePoint: [{ locationId: [this.glbService.selectAirportFrom.iata] }] }], arrivalLocalization: [{ arrivalPointDetails: [{ locationId: [this.glbService.selectAirportTo.iata] }] }], timeDetails: [{ firstDateTimeDetail: [{ date: [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }] }] }, { requestedSegmentRef: [{ segRef: ["2"] }], departureLocalization: [{ departurePoint: [{ locationId: [this.glbService.selectAirportTo.iata] }] }], arrivalLocalization: [{ arrivalPointDetails: [{ locationId: [this.glbService.selectAirportFrom.iata] }] }], timeDetails: [{ firstDateTimeDetail: [{ date: [format(parseISO(this.glbService.selectedDateRegresoStart), 'ddMMyy')] }] }] }] : [{ requestedSegmentRef: [{ segRef: ["1"] }], departureLocalization: [{ departurePoint: [{ locationId: [this.glbService.selectAirportFrom.iata] }] }], arrivalLocalization: [{ arrivalPointDetails: [{ locationId: [this.glbService.selectAirportTo.iata] }] }], timeDetails: [{ firstDateTimeDetail: [{ date: [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }] }] }];
    let contPax = 1;
    const paxAdt = await Array.from({ length: this.glbService.passengers.adult }, () => ({ ref: [(contPax++) + ''] })), paxCnn = await Array.from({ length: this.glbService.passengers.child }, () => ({ ref: [(contPax++) + ''] })), paxInf = await Array.from({ length: this.glbService.passengers.infant }, (_, i) => ({ ref: [(i + 1) + ''], infantIndicator: [(i + 1) + ''] }));
    let paxReference = [{ ptc: ["ADT"], traveller: paxAdt }];
    this.glbService.passengers.child > 0 ? paxReference.push({ ptc: ["CNN"], traveller: paxCnn }) : false; this.glbService.passengers.infant > 0 ? paxReference.push({ ptc: ["INF"], traveller: paxInf }) : false;
    const bodyx: any = {
      data: {
        "soapenv:Body": {
          Fare_MasterPricerTravelBoardSearch: [
            {
              numberOfUnit: [{ unitNumberDetail: [{ numberOfUnits: [this.glbService.passengers.adult + this.glbService.passengers.child], typeOfUnit: ["PX"] }, { numberOfUnits: ["10"], typeOfUnit: ["RC"] }] }],
              paxReference: paxReference,
              fareOptions: [{ pricingTickInfo: [{ pricingTicketing: [{ priceType: ["ET", "RP", "RU"] }] }] }],
              travelFlightInfo: [{ cabinId: [{ cabin: [this.glbService.clase] }] }],
              flightInfo: [ { flightDetail: [ { flightType: [ "N" ] } ] } ],
              itinerary: requestedSegmentRef
            }
          ]
        }
      }
    }; */
    const body = {
      type: this.glbService.trips,
      cabin: this.glbService.clase,
      iataFrom: this.glbService.selectAirportFrom.iata,
      iataTo: this.glbService.selectAirportTo.iata,
      timeFrom: this.glbService.selectedDateSalidaStart,
      timeTo: this.glbService.selectedDateRegresoStart,
      adult: this.glbService.passengers.adult,
      child: this.glbService.passengers.child,
      infant: this.glbService.passengers.infant,
      nonStop: false
    };
    if (!this.validators()) return;
    this.glbService.bookingResults = [];
    try {
      this.glbService.bookingloading = true;
      const bookingResponse: any = await this.apiService.post('/travel/master_pricer_travel_board_search', body);
      /* this.glbService.session = bookingResponse.session; */
      console.log('bookingResponse: ', bookingResponse);
      if (bookingResponse.error) {
        /* this.alertMain.present('Error', 'Al consultar vuelos', bookingResponse.data.error); return; */
        this.alertMain.present(bookingResponse.data.title1, bookingResponse.data.title2, bookingResponse.data.title3); return;
      }else {
        if (bookingResponse.data.length > 0) {
          this.glbService.bookingResults = bookingResponse.data;
          this.glbService.firstSearch = false;
          return;
        }
      }
      /* this.alertMain.present('Ups', 'No se encontraron vuelos', 'Intenta con otros parametros de busqueda.'); */
    } catch (e) {
      console.error('error bookingResponse: ', e);
      this.alertMain.present('Error', 'Al consultar vuelos', JSON.stringify(e));
    } finally {
      this.glbService.bookingloading = false;
    }
  }

  validators(): boolean {
    const conditions = [
      { condition: !this.glbService.selectAirportFrom.iata, message: 'Seleccione un aeropuerto de origen' },
      { condition: !this.glbService.selectAirportTo.iata, message: 'Seleccione un aeropuerto de destino' },
      { condition: !this.glbService.dateFrom, message: 'Seleccione una fecha de salida' },
      { condition: this.glbService.totalPassengers <= 0, message: 'Seleccione al menos un pasajero' }
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

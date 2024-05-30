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
    // const requestedSegmentRef = this.glbService.trips == 'idaVuelta' ? [ { "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode], "airportCityQualifier": ["C"] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode], "airportCityQualifier": ["C"] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] }, { "requestedSegmentRef": [{ "segRef": ["2"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode], "airportCityQualifier": ["C"] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode], "airportCityQualifier": ["C"] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateRegresoStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] }] : [{ "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode], "airportCityQualifier": ["C"] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode], "airportCityQualifier": ["C"] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] }];
    //const requestedSegmentRef = this.glbService.trips == 'idaVuelta' ? [ { "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] }, { "requestedSegmentRef": [{ "segRef": ["2"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateRegresoStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] }] : [{ "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "depMultiCity": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "arrivalLocalization": [{ "arrivalMultiCity": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }], "rangeOfDate": [{ "rangeQualifier": ["M"], "dayInterval": ["2"] }] }] }];
    const requestedSegmentRef = this.glbService.trips == 'idaVuelta' ? [{ "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "departurePoint": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "arrivalLocalization": [{ "arrivalPointDetails": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }] }] }, { "requestedSegmentRef": [{ "segRef": ["2"] }], "departureLocalization": [{ "departurePoint": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "arrivalLocalization": [{ "arrivalPointDetails": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateRegresoStart), 'ddMMyy')] }] }] }] : [{ "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "departurePoint": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "arrivalLocalization": [{ "arrivalPointDetails": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }] }] }];
    let contPax = 1;
    const paxAdt = await Array.from({ length: this.glbService.passengers.adult }, () => ({ ref: [(contPax++) + ''] })), paxCnn = await Array.from({ length: this.glbService.passengers.child }, () => ({ ref: [(contPax++) + ''] })), paxInf = await Array.from({ length: this.glbService.passengers.infant }, (_, i) => ({ ref: [(i + 1) + ''], infantIndicator: [(i + 1) + ''] }));
    let paxReference = [{ "ptc": ["ADT"], "traveller": paxAdt }];
    this.glbService.passengers.child > 0 ? paxReference.push({ "ptc": ["CNN"], "traveller": paxCnn }) : false; this.glbService.passengers.infant > 0 ? paxReference.push({ "ptc": ["INF"], "traveller": paxInf }) : false;
    /* const requestedSegmentRef = this.glbService.trips == 'idaVuelta' ? [{ "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "departurePoint": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "arrivalLocalization": [{ "arrivalPointDetails": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }] }] }, { "requestedSegmentRef": [{ "segRef": ["2"] }], "departureLocalization": [{ "departurePoint": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "arrivalLocalization": [{ "arrivalPointDetails": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateRegresoStart), 'ddMMyy')] }] }] }] : [{ "requestedSegmentRef": [{ "segRef": ["1"] }], "departureLocalization": [{ "departurePoint": [{ "locationId": [this.glbService.selectAirportFrom.iataCode] }] }], "arrivalLocalization": [{ "arrivalPointDetails": [{ "locationId": [this.glbService.selectAirportTo.iataCode] }] }], "timeDetails": [{ "firstDateTimeDetail": [{ "date": [format(parseISO(this.glbService.selectedDateSalidaStart), 'ddMMyy')] }] }] }];
    const body: any = {
      "data": {
        "soapenv:Body": {
          "Fare_MasterPricerTravelBoardSearch": [
            {
              "numberOfUnit": [{ "unitNumberDetail": [{ "numberOfUnits": [(this.glbService.passengers.adult + this.glbService.passengers.child) + ""], "typeOfUnit": ["PX"] }, { "numberOfUnits": ["250"], "typeOfUnit": ["RC"] }] }],
              "paxReference": [{ "ptc": ["ADT"], "traveller": paxAdt }, { "ptc": ["CNN"], "traveller": paxCnn }, { "ptc": ["INF"], "traveller": paxInf }],
              "fareOptions": [{ "pricingTickInfo": [{ "pricingTicketing": [{ "priceType": ["ET", "RP", "RU"] }] }]},{ "feeIdDescription": [ { "feeId": [ { "feeType": [ "SBF" ], "feeIdNumber": [ "1" ] }, { "feeType": [ "FFI" ], "feeIdNumber": [ "3" ] }, { "feeType": [ "COA" ], "feeIdNumber": [ "1" ] } ] } ] }],
              "itinerary": requestedSegmentRef
            }
          ]
        }
      }
    }; */
    const body: any = {
      "data": {
        "soapenv:Body": {
          "Fare_MasterPricerTravelBoardSearch": [
            {
              "numberOfUnit": [{ "unitNumberDetail": [{ "numberOfUnits": [this.glbService.passengers.adult + this.glbService.passengers.child], "typeOfUnit": ["PX"] }, { "numberOfUnits": ["250"], "typeOfUnit": ["RC"] }] }],
              "paxReference": paxReference,
              "fareOptions": [{ "pricingTickInfo": [{ "pricingTicketing": [{ "priceType": ["ET", "RP", "RU"] }] }] }],
              "travelFlightInfo": [{ "cabinId": [{ "cabin": [this.glbService.clase] }] }],
              "itinerary": requestedSegmentRef
            }
          ]
        }
      }
    };
    if (!this.validators()) return;
    this.glbService.bookingResults = [];
    try {
      this.glbService.bookingloading = true;
      const bookingResponse: any = await this.apiService.post('/travel/booking', body);
      console.log('bookingResponse: ', bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]);
      if (bookingResponse.data.error) {
        this.alertMain.present('Error', 'Al consultar vuelos', bookingResponse.data.error);
        return;
      }
      if ((bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex']).length > 0) {
        /* let result = bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][0]['groupOfFlights'].map((item: any) => {
          let found = bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][1]['groupOfFlights'].find((element: any) => (element.propFlightGrDetail[0].flightProposal[0].ref[0] == item.propFlightGrDetail[0].flightProposal[0].ref[0], console.log(`${element.propFlightGrDetail[0].flightProposal[0].ref[0]} == ${item.propFlightGrDetail[0].flightProposal[0].ref[0]}`)));
          return { ...item, ...found };
        }); */
        let result = [];
        if (bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'].length == 2) {
          for (let i = 0; i < bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][0]['groupOfFlights'].length; i++) {
            for (let j = 0; j < bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][1]['groupOfFlights'].length; j++) {
              if (bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][0]['groupOfFlights'][i].propFlightGrDetail[0].flightProposal[0].ref[0] == bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][1]['groupOfFlights'][j].propFlightGrDetail[0].flightProposal[0].ref[0]) {
                result.push({ ida: bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][0]['groupOfFlights'][i], vuelta: bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][1]['groupOfFlights'][j] });
              }
            }
          }
        } else if (bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'].length == 1) {
          for (let i = 0; i < bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][0]['groupOfFlights'].length; i++) {
            result.push({ ida: bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'][0]['groupOfFlights'][i] });
          }
        } else {
          this.alertMain.present('Ups', 'No se encontraron vuelos', 'Intenta con otros parametros de busqueda.');
        }
        console.log('result: ', result);
        this.glbService.bookingResults = result;
        /* console.log('result: ', result); */
        /* this.glbService.bookingResults = bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex']; */
        /* const bookingResultsTemp = bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0]['Fare_MasterPricerTravelBoardSearchReply'][0]['flightIndex'];
        for (let i = 0; i < bookingResultsTemp[0].groupOfFlights.length; i++) {
          bookingResultsTemp[0].groupOfFlights[i].idReserva = bookingResultsTemp[0].groupOfFlights[i].propFlightGrDetail[0].flightProposal[0].ref[0];
        }
        if(bookingResultsTemp[1].groupOfFlights.length > 0){
          for (let i = 0; i < bookingResultsTemp[1].groupOfFlights.length; i++) {
            bookingResultsTemp[1].groupOfFlights[i].idReserva = bookingResultsTemp[1].groupOfFlights[i].propFlightGrDetail[0].flightProposal[0].ref[0];
          }
        } */
        /* console.log('bookingResultsTemp: ', bookingResultsTemp); */
        this.glbService.firstSearch = false;
        return;
      }
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
      { condition: !this.glbService.selectAirportFrom.iataCode, message: 'Seleccione un aeropuerto de origen' },
      { condition: !this.glbService.selectAirportTo.iataCode, message: 'Seleccione un aeropuerto de destino' },
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

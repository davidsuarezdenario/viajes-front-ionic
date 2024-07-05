import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonChip, IonText, IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonProgressBar, IonCol } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { ApiService } from "../../shared/services/api/api.service";
import { Router } from '@angular/router';
import { AlertMainService } from '../../shared//services/alert-main/alert-main.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-booking-one',
  templateUrl: './booking-one.page.html',
  styleUrls: ['./booking-one.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonChip, IonText, IonCol, IonProgressBar, IonRow, IonGrid, IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonHeader, CommonModule, HeaderMainComponent]
})
export class BookingOnePage implements OnInit {

  constructor(
    public glbService: GlbService,
    private router: Router,
    private location: Location,
    private alertMain: AlertMainService,
    private apiService: ApiService) {
  }

  Fare_InformativePricingWithoutPNRResponse: any = [];
  Air_SellFromRecommendation: any = [];
  session: any = {};

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.glbService.flightSelected.length == 0 ? this.router.navigate(['/home']) : this.Fare_InformativePricingWithoutPNR();
  }

  async Fare_InformativePricingWithoutPNR() {
    let passengersGroup: any = [], segmentGroup: any = [];
    //console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
    if (this.glbService.flightSelected) {
      let contPax = 1, contItem = 0;
      for (let i = 0; i < this.glbService.flightSelected.pax.length; i++) {
        if (this.glbService.flightSelected.pax[i].paxReference[0].ptc[0] == 'ADT') {
          let travellerDetails = [];
          for (let j = 0; j < this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; j++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
          passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["1"], numberOfUnits: [this.glbService.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["ADT"] }] });
        }
        if (this.glbService.flightSelected.pax[i].paxReference[0].ptc[0] == 'CNN') {
          let travellerDetails = [];
          for (let k = 0; k < this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; k++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
          passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["2"], numberOfUnits: [this.glbService.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["CH"] }] });
        }
        if (this.glbService.flightSelected.pax[i].paxReference[0].ptc[0] == 'INF') {
          let travellerDetails = [];
          for (let l = 0; l < this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; l++) { travellerDetails.push({ measurementValue: [(l + 1) + ''] }); }
          passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["3"], numberOfUnits: [this.glbService.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["INF"], fareDetails: [{ qualifier: ["766"] }] }] });
        }
      }
      console.log('flightSelected.pax: ', this.glbService.flightSelected.pax);
      for (let x = 0; x < this.glbService.flightSelected.ida.flightDetails.length; x++) {
        contItem++;
        segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glbService.flightSelected.pax[0].fareDetails[0].groupOfFares[x].productInformation[0].cabinProduct[0].rbd[0]] }],
            flightTypeDetails: [{ flightIndicator: ["1"] }],
            itemNumber: [contItem + ""]
          }]
        });
      }
      if (this.glbService.flightSelected.vuelta) {
        for (let y = 0; y < this.glbService.flightSelected.vuelta.flightDetails.length; y++) {
          contItem++;
          segmentGroup.push({
            segmentInformation: [{
              flightDate: [{ departureDate: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
              boardPointDetails: [{ trueLocationId: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[0].locationId[0]] }],
              offpointDetails: [{ trueLocationId: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[1].locationId[0]] }],
              companyDetails: [{ marketingCompany: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].companyId[0].marketingCarrier[0]] }],
              flightIdentification: [{ flightNumber: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glbService.flightSelected.pax[0].fareDetails[0].groupOfFares[y].productInformation[0].cabinProduct[0].rbd[0]] }],
              flightTypeDetails: [{ flightIndicator: ["2"] }],
              itemNumber: [contItem + ""]
            }]
          });
        }
      }
    }
    const body: any = {
      data: {
        "soapenv:Body": {
          Fare_InformativePricingWithoutPNR: [{
            passengersGroup: passengersGroup,
            segmentGroup: segmentGroup,
            pricingOptionGroup: [
              { pricingOptionKey: [{ pricingOptionKey: ["RP"] }] },
              { pricingOptionKey: [{ pricingOptionKey: ["RLO"] }] },
              { pricingOptionKey: [{ pricingOptionKey: ["FCO"] }], currency: [{ firstCurrencyDetails: [{ currencyQualifier: ["FCO"], currencyIsoCode: ["COP"] }] }] }
            ]
          }]
        }
      }
    }
    const bookingResponse: any = await this.apiService.post('/travel/informative_pricing_without_pnr', body);
    this.session = bookingResponse.session;
    this.Fare_InformativePricingWithoutPNRResponse = bookingResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Fare_InformativePricingWithoutPNRReply[0].mainGroup;
    for (let i = 0; i < this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup.length; i++) {
      this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup[i].fareInfoGroup[0].fareAmount[0].otherMonetaryDetails[0].amount[0] = parseInt(this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup[i].fareInfoGroup[0].fareAmount[0].otherMonetaryDetails[0].amount[0]);
      this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup[i].fareInfoGroup[0].fareAmount[0].otherMonetaryDetails[1].amount[0] = parseInt(this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup[i].fareInfoGroup[0].fareAmount[0].otherMonetaryDetails[1].amount[0]);
      this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup[i].numberOfPax[0].segmentControlDetails[0].numberOfUnits[0] = parseInt(this.Fare_InformativePricingWithoutPNRResponse[0].pricingGroupLevelGroup[i].numberOfPax[0].segmentControlDetails[0].numberOfUnits[0]);
    }
    console.log('bookingResponse: ', bookingResponse);
    console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
    this.airSellFromRecommendation(this.Fare_InformativePricingWithoutPNRResponse[0], this.session);
    //this.airSellFromRecommendation(bookingResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Fare_InformativePricingWithoutPNRReply[0].mainGroup[0], bookingResponse.session);
  }
  calculateTotal(response: any) {
    let total = 0;
    response.pricingGroupLevelGroup.forEach((traveller: any) => {
      const amount = traveller.fareInfoGroup[0].fareAmount[0].otherMonetaryDetails[1].amount[0], units = traveller.numberOfPax[0].segmentControlDetails[0].numberOfUnits[0];
      total += amount * units;
    });
    return total;
  }
  async airSellFromRecommendation(response: any, session: any) {
    let segmentInformationIda: any = [], quantity = 0, segmentInformationVuelta: any = [], segVuelta = false;
    console.log('airSellFromRecommendation response: ', response);
    for (let j = 0; j < response.pricingGroupLevelGroup.length; j++) {
      if (response.pricingGroupLevelGroup[j].numberOfPax[0].segmentControlDetails[0].quantity[0] != '3') {
        quantity = quantity + parseInt(response.pricingGroupLevelGroup[j].numberOfPax[0].segmentControlDetails[0].numberOfUnits[0]);
      }
    }
    if (this.glbService.flightSelected.vuelta) {
      for (let i = 0; i < response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup.length; i++) {
        if (!segVuelta) {
          segmentInformationIda.push({
            travelProductInformation: [{
              flightDate: [{ departureDate: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightDate[0].departureDate[0]] }],
              boardPointDetails: [{ trueLocationId: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].boardPointDetails[0].trueLocationId[0]] }],
              offpointDetails: [{ trueLocationId: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].offpointDetails[0].trueLocationId[0]] }],
              companyDetails: [{ marketingCompany: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].companyDetails[0].marketingCompany[0]] }],
              flightIdentification: [{ flightNumber: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightIdentification[0].flightNumber[0]], bookingClass: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightIdentification[0].bookingClass[0]] }]
            }],
            relatedproductInformation: [{ quantity: [quantity + ""], statusCode: ["NN"] }]
          });
          this.glbService.flightSelected.ida.flightDetails[this.glbService.flightSelected.ida.flightDetails.length - 1].flightInformation[0].location[1].locationId[0] == response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].offpointDetails[0].trueLocationId[0] ? segVuelta = true : false;
        } else {
          segmentInformationVuelta.push({
            travelProductInformation: [{
              flightDate: [{ departureDate: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightDate[0].departureDate[0]] }],
              boardPointDetails: [{ trueLocationId: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].boardPointDetails[0].trueLocationId[0]] }],
              offpointDetails: [{ trueLocationId: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].offpointDetails[0].trueLocationId[0]] }],
              companyDetails: [{ marketingCompany: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].companyDetails[0].marketingCompany[0]] }],
              flightIdentification: [{ flightNumber: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightIdentification[0].flightNumber[0]], bookingClass: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightIdentification[0].bookingClass[0]] }]
            }],
            relatedproductInformation: [{ quantity: [quantity + ""], statusCode: ["NN"] }]
          });
        }
      }
    } else {
      for (let i = 0; i < response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup.length; i++) {
        segmentInformationIda.push({
          travelProductInformation: [{
            flightDate: [{ departureDate: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightDate[0].departureDate[0]] }],
            boardPointDetails: [{ trueLocationId: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].boardPointDetails[0].trueLocationId[0]] }],
            offpointDetails: [{ trueLocationId: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].offpointDetails[0].trueLocationId[0]] }],
            companyDetails: [{ marketingCompany: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].companyDetails[0].marketingCompany[0]] }],
            flightIdentification: [{ flightNumber: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightIdentification[0].flightNumber[0]], bookingClass: [response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup[i].segmentInformation[0].flightIdentification[0].bookingClass[0]] }]
          }],
          relatedproductInformation: [{ quantity: [quantity + ""], statusCode: ["NN"] }]
        });
      }
    }
    let body: any = { session: session }
    if (this.glbService.flightSelected.vuelta) {
      body.data = { "soapenv:Body": { Air_SellFromRecommendation: [{ messageActionDetails: [{ messageFunctionDetails: [{ messageFunction: ["183"], additionalMessageFunction: ["M1"] }] }], itineraryDetails: [{ originDestinationDetails: [{ origin: [this.glbService.flightSelected.ida.flightDetails[0].flightInformation[0].location[0].locationId[0]], destination: [this.glbService.flightSelected.ida.flightDetails[this.glbService.flightSelected.ida.flightDetails.length - 1].flightInformation[0].location[1].locationId[0]] }], message: [{ messageFunctionDetails: [{ messageFunction: ["183"] }] }], segmentInformation: segmentInformationIda }, { originDestinationDetails: [{ origin: this.glbService.flightSelected.vuelta.flightDetails[0].flightInformation[0].location[0].locationId[0], destination: this.glbService.flightSelected.vuelta.flightDetails[this.glbService.flightSelected.vuelta.flightDetails.length - 1].flightInformation[0].location[1].locationId[0] }], message: [{ messageFunctionDetails: [{ messageFunction: ["183"] }] }], segmentInformation: segmentInformationVuelta }] }] } }
    } else {
      body.data = { "soapenv:Body": { Air_SellFromRecommendation: [{ messageActionDetails: [{ messageFunctionDetails: [{ messageFunction: ["183"], additionalMessageFunction: ["M1"] }] }], itineraryDetails: [{ originDestinationDetails: [{ origin: [this.glbService.flightSelected.ida.flightDetails[0].flightInformation[0].location[0].locationId[0]], destination: [this.glbService.flightSelected.ida.flightDetails[this.glbService.flightSelected.ida.flightDetails.length - 1].flightInformation[0].location[1].locationId[0]] }], message: [{ messageFunctionDetails: [{ messageFunction: ["183"] }] }], segmentInformation: segmentInformationIda }] }] } }
    }
    console.log('body: ', body);
    const airSellFromRecommendationResponse: any = await this.apiService.post('/travel/sell_from_recommendation', body);
    console.log('airSellFromRecommendationResponse: ', airSellFromRecommendationResponse);
    this.Air_SellFromRecommendation = airSellFromRecommendationResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Air_SellFromRecommendationReply[0].itineraryDetails;
    this.checkAllSeat(airSellFromRecommendationResponse.data['soapenv:Envelope']['soapenv:Body'][0].Air_SellFromRecommendationReply[0]);
  }
  checkAllSeat(response: any) {
    let segRouter = true;
    for (let i = 0; i < response.itineraryDetails.length; i++) {
      for (let j = 0; j < response.itineraryDetails[i].segmentInformation.length; j++) {
        console.log(response.itineraryDetails[i].segmentInformation[j].actionDetails[0]);
        if (response.itineraryDetails[i].segmentInformation[j].actionDetails[0].statusCode[0] != 'OK') {
          this.Fare_InformativePricingWithoutPNRResponse = undefined; segRouter = false;
          this.alertMain.present('Ups', 'Este vuelo no está disponible', 'Intenta con otro vuelo.');
          i = response.itineraryDetails.length; this.location.back(); return;
        }
      }
    }
    segRouter ? this.glbService.passengersData = response : false;
  }
  goToBookingTwo(){
    this.router.navigate(['/booking-two']); 
  }

  /* PNRSellFromRecommendation() { */

  body = {
    "soap:Body": {
      PNR_AddMultiElements: [{
        pnrActions: [{ optionCode: ["0"] }],
        travellerInfo: [{
          elementManagementPassenger: [{ reference: [{ qualifier: ["PR"], number: ["1"] }], segmentName: ["NM"] }],
          passengerData: [
            {
              travellerInformation: [{ traveller: [{ surname: ["BARBO"], quantity: ["2"] }], passenger: [{ firstName: ["BRUNO"], type: ["ADT"], infantIndicator: ["3"] }] }],
              dateOfBirth: [{ dateAndTimeDetails: [{ date: ["04JAN84"] }] }]
            },
            {
              travellerInformation: [{ traveller: [{ surname: ["ALCEDO"] }], passenger: [{ firstName: ["ANGELES"], type: ["INF"] }] }],
              dateOfBirth: [{ dateAndTimeDetails: [{ date: ["29NOV22"] }] }]
            }
          ]
        },
        {
          elementManagementPassenger: [{ reference: [{ qualifier: ["PR"], number: ["2"] }], segmentName: ["NM"] }],
          passengerData: [{
            travellerInformation: [{ traveller: [{ surname: ["RAMIRE"], quantity: ["1"] }], passenger: [{ firstName: ["CALIXTO"], type: ["CNN"] }] }],
            dateOfBirth: [{ dateAndTimeDetails: [{ date: ["07JUL16"] }] }]
          }]
        }],
        dataElementsMaster: [{
          marker1: [""],
          dataElementsIndiv: [{
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["1"] }], segmentName: ["AP"] }],
            freetextData: [{ freetextDetail: [{ subjectQualifier: ["3"], type: ["6"] }], longFreetext: ["5769420 + ()"] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["2"] }], segmentName: ["AP"] }],
            freetextData: [{ freetextDetail: [{ subjectQualifier: ["3"], type: ["P02"] }], longFreetext: ["BRUNO_1AWS_TEST@TAYRONA.LATAM.CO"] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["3"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["FOID"], status: ["HK"], quantity: ["1"], companyId: ["AM"], freetext: ["NI19393920"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["1"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["4"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["DOCS"], status: ["HK"], quantity: ["1"], companyId: ["YY"], freetext: ["P-COL-19393920-COL-04JAN84-F-28SEP28-BARBO-BRUNO"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["1"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["5"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["DOCS"], status: ["HK"], quantity: ["1"], companyId: ["YY"], freetext: ["P-COL-44444400-COL-29NOV22-FI-28SEP28-ALCEDO-ANGELES"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["1"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["6"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["FOID"], status: ["HK"], quantity: ["1"], companyId: ["AM"], freetext: ["NI29898960"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["2"] }] }]
          },
          {
            elementManagementData: [{ reference: [{ qualifier: ["OT"], number: ["7"] }], segmentName: ["SSR"] }],
            serviceRequest: [{ ssr: [{ type: ["DOCS"], status: ["HK"], quantity: ["1"], companyId: ["YY"], freetext: ["P-COL-29898960-COL-07JUL16-M-28SEP28-RAMIRE-CALIXTO"] }] }],
            referenceForDataElement: [{ reference: [{ qualifier: ["PR"], number: ["2"] }] }]
          }]
        }]
      }]
    }
  }
}

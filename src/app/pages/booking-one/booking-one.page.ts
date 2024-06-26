import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonProgressBar, IonCol } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { ApiService } from "../../shared/services/api/api.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-one',
  templateUrl: './booking-one.page.html',
  styleUrls: ['./booking-one.page.scss'],
  standalone: true,
  imports: [IonCol, IonProgressBar, IonRow, IonGrid, IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonHeader, CommonModule, FormsModule, HeaderMainComponent]
})
export class BookingOnePage implements OnInit {

  constructor(
    private glbService: GlbService,
    private router: Router,
    private apiService: ApiService) {
    this.glbService.flightSelected.length == 0 ? this.router.navigate(['/home']) : this.loadResult();;
  }


  ngOnInit() {
  }

  async loadResult() {
    let passengersGroup: any = [];
    let segmentGroup: any = [];
    console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
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
        console.log('passengersGroup: ', passengersGroup);
      }
      console.log('total pasajeros: ', contPax - 1);
      for (let x = 0; x < this.glbService.flightSelected.ida.flightDetails.length; x++) {
        contItem++;
        segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glbService.flightSelected.ida.flightDetails[x].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glbService.flightSelected.pax[0].fareDetails[x].groupOfFares[0].productInformation[0].cabinProduct[0].cabin[0]] }],
            flightTypeDetails: [{ flightIndicator: ["1"] }],
            itemNumber: [contItem + ""]
          }]
        });
      }
      for (let y = 0; y < this.glbService.flightSelected.vuelta.flightDetails.length; y++) {
        contItem++;
        segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glbService.flightSelected.vuelta.flightDetails[y].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glbService.flightSelected.pax[0].fareDetails[y].groupOfFares[0].productInformation[0].cabinProduct[0].cabin[0]] }],
            flightTypeDetails: [{ flightIndicator: ["2"] }],
            itemNumber: [contItem + ""]
          }]
        });
      }
    }
    const body: any = {
      data: {
        "soapenv:Body": {
          Fare_InformativePricingWithoutPNR: [
            {
              passengersGroup: passengersGroup,
              segmentGroup: segmentGroup,
              pricingOptionGroup: [
                { pricingOptionKey: [{ pricingOptionKey: ["RP"] }] },
                { pricingOptionKey: [{ pricingOptionKey: ["RLO"] }] },
                { pricingOptionKey: [{ pricingOptionKey: ["FCO"] }], currency: [{ firstCurrencyDetails: [{ currencyQualifier: ["FCO"], currencyIsoCode: ["COP"] }] }] }
              ]
            }
          ]
        }
      }
    }
    const bookingResponse: any = await this.apiService.post('/travel/informative_pricing_without_pnr', body);
    console.log('bookingResponse: ', bookingResponse);
    this.airSellFromRecommendation(bookingResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Fare_InformativePricingWithoutPNRReply[0].mainGroup[0], bookingResponse.session);
  }
  async airSellFromRecommendation(response: any, session: any) {
    let segmentInformation: any = [], relatedproductInformation: any = [], quantity = 0;
    console.log('response: ', response);
    for (let j = 0; j < response.pricingGroupLevelGroup.length; j++) {
      console.log(`response.pricingGroupLevelGroup[${j}]: `, response.pricingGroupLevelGroup[j].numberOfPax[0].segmentControlDetails[0]);
      quantity = quantity + parseInt(response.pricingGroupLevelGroup[j].numberOfPax[0].segmentControlDetails[0].quantity[0]);
    }
    console.log('quantity: ', quantity);
    for (let i = 0; i < response.pricingGroupLevelGroup[0].fareInfoGroup[0].segmentLevelGroup.length; i++) {
      segmentInformation.push({
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
    const body: any = {
      data: {
        "soapenv:Body": {
          Air_SellFromRecommendation: [
            {
              messageActionDetails: [{ messageFunctionDetails: [{ messageFunction: ["183"], additionalMessageFunction: ["M1"] }] }],
              itineraryDetails: [
                {
                  originDestinationDetails: [{ origin: ["BOG"], destination: ["MEX"] }],
                  message: [{ messageFunctionDetails: [{ messageFunction: ["183"] }] }],
                  segmentInformation: segmentInformation
                }
              ]
            }
          ]
        }
      },
      session: session
    }
    console.log('body: ', body);
    const airSellFromRecommendationResponse: any = await this.apiService.post('/travel/sell_from_recommendation', body);
    console.log('airSellFromRecommendationResponse: ', airSellFromRecommendationResponse);
  }
}

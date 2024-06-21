import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonProgressBar, IonCol } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-one',
  templateUrl: './booking-one.page.html',
  styleUrls: ['./booking-one.page.scss'],
  standalone: true,
  imports: [IonCol, IonProgressBar, IonRow, IonGrid, IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonHeader, CommonModule, FormsModule, HeaderMainComponent]
})
export class BookingOnePage implements OnInit {

  constructor(public glb: GlbService, private router: Router) {
    this.glb.flightSelected.length == 0 ? this.router.navigate(['/home']) : this.loadResult();;
  }

  passengersGroup: any = [];
  segmentGroup: any = [];

  ngOnInit() {
  }

  async loadResult() {
    console.log('this.glb.flightSelected: ', this.glb.flightSelected);
    if (this.glb.flightSelected) {
      let contPax = 1;
      for (let i = 0; i < this.glb.flightSelected.pax.length; i++) {
        if (this.glb.flightSelected.pax[i].paxReference[0].ptc[0] == 'ADT') {
          let travellerDetails = [];
          for (let j = 0; j < this.glb.flightSelected.pax[i].paxReference[0].traveller.length; j++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
          this.passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["1"], numberOfUnits: [this.glb.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["ADT"] }] });
        }
        if (this.glb.flightSelected.pax[i].paxReference[0].ptc[0] == 'CNN') {
          let travellerDetails = [];
          for (let k = 0; k < this.glb.flightSelected.pax[i].paxReference[0].traveller.length; k++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
          this.passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["2"], numberOfUnits: [this.glb.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["CH"] }] });
        }
        if (this.glb.flightSelected.pax[i].paxReference[0].ptc[0] == 'INF') {
          let travellerDetails = [];
          for (let l = 0; l < this.glb.flightSelected.pax[i].paxReference[0].traveller.length; l++) { travellerDetails.push({ measurementValue: [(l + 1) + ''] }); }
          this.passengersGroup.push({ segmentRepetitionControl: [{ segmentControlDetails: [{ quantity: ["3"], numberOfUnits: [this.glb.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], travellersID: [{ travellerDetails: travellerDetails }], discountPtc: [{ valueQualifier: ["INF"], fareDetails: [{ qualifier: ["766"] }] }] });
        }
        console.log('passengersGroup: ', this.passengersGroup);
      }
      for (let x = 0; x < this.glb.flightSelected.ida.flightDetails.length; x++) {
        this.segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glb.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glb.flightSelected.ida.flightDetails[x].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glb.flightSelected.ida.flightDetails[x].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glb.flightSelected.ida.flightDetails[x].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glb.flightSelected.ida.flightDetails[x].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glb.flightSelected.ida.flightDetails[x].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glb.flightSelected.pax[0].fareDetails[0].groupOfFares[1].productInformation[0].cabinProduct[0].cabin[0]] }],
            flightTypeDetails: [{ flightIndicator: [(x + 1) + ""] }],
            itemNumber: ["1"]
          }]
        });
      }
      for (let y = 0; y < this.glb.flightSelected.vuelta.flightDetails.length; y++) {
        this.segmentGroup.push({
          segmentInformation: [{
            flightDate: [{ departureDate: [this.glb.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].dateOfDeparture[0]], departureTime: [this.glb.flightSelected.vuelta.flightDetails[y].flightInformation[0].productDateTime[0].timeOfDeparture[0]] }],
            boardPointDetails: [{ trueLocationId: [this.glb.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[0].locationId[0]] }],
            offpointDetails: [{ trueLocationId: [this.glb.flightSelected.vuelta.flightDetails[y].flightInformation[0].location[1].locationId[0]] }],
            companyDetails: [{ marketingCompany: [this.glb.flightSelected.vuelta.flightDetails[y].flightInformation[0].companyId[0].marketingCarrier[0]] }],
            flightIdentification: [{ flightNumber: [this.glb.flightSelected.vuelta.flightDetails[y].flightInformation[0].flightOrtrainNumber[0]], bookingClass: [this.glb.flightSelected.pax[0].fareDetails[1].groupOfFares[1].productInformation[0].cabinProduct[0].cabin[0]] }],
            flightTypeDetails: [{ flightIndicator: [(y + 1) + ""] }],
            itemNumber: ["2"]
          }]
        });
      }
    }
    console.log('segmentGroup: ', this.segmentGroup);
  }
  body = {
    "soapenv:Body": {
      Fare_InformativePricingWithoutPNR: [
        {
          passengersGroup: this.passengersGroup,
          segmentGroup: [
            {
              segmentInformation: [{
                flightDate: [{ departureDate: ["210824"], departureTime: ["2325"] }],
                boardPointDetails: [{ trueLocationId: ["BOG"] }],
                offpointDetails: [{ trueLocationId: ["LHR"] }],
                companyDetails: [{ marketingCompany: ["AV"] }],
                flightIdentification: [{ flightNumber: ["120"], bookingClass: ["A"] }],
                flightTypeDetails: [{ flightIndicator: ["1"] }],
                itemNumber: ["1"]
              }]
            },
            {
              segmentInformation: [{
                flightDate: [{ departureDate: ["270724"], departureTime: ["2205"] }],
                boardPointDetails: [{ trueLocationId: ["LHR"] }],
                offpointDetails: [{ trueLocationId: ["BOG"] }],
                companyDetails: [{ marketingCompany: ["AV"] }],
                flightIdentification: [{ flightNumber: ["121"], bookingClass: ["K"] }],
                flightTypeDetails: [{ flightIndicator: ["1"] }],
                itemNumber: ["2"]
              }
              ]
            }
          ],
          pricingOptionGroup: [
            { pricingOptionKey: [{ pricingOptionKey: ["RP"] }] },
            { pricingOptionKey: [{ pricingOptionKey: ["RU"] }] },
            { pricingOptionKey: [{ pricingOptionKey: ["RLO"] }] }
          ]
        }
      ]
    }
  }
}

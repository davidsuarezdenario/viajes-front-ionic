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
    console.log('this.glb.flightSelected.length: ', this.glb.flightSelected.length);
    this.glb.flightSelected.length == 0 ? this.router.navigate(['/home']) : this.loadResult();;
  }

  passengersGroup: any = [];

  ngOnInit() {
  }

  async loadResult() {
    console.log('this.glb.flightSelected: ', this.glb.flightSelected.pax);
    let contPax = 1;
    if (this.glb.flightSelected.pax) { }
    for (let i = 0; i < this.glb.flightSelected.pax.length; i++) {
      if (this.glb.flightSelected.pax[i].paxReference[0].ptc[0] == 'ADT') {
        let travellerDetails = [];
        for (let j = 0; j < this.glb.flightSelected.pax[i].paxReference[0].traveller.length; j++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
        this.passengersGroup.push({ "segmentRepetitionControl": [{ "segmentControlDetails": [{ "quantity": ["1"], "numberOfUnits": [this.glb.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], "travellersID": [{ "travellerDetails": travellerDetails }], "discountPtc": [{ "valueQualifier": ["ADT"] }] });
      }
      if (this.glb.flightSelected.pax[i].paxReference[0].ptc[0] == 'CNN') {
        let travellerDetails = [];
        for (let k = 0; k < this.glb.flightSelected.pax[i].paxReference[0].traveller.length; k++) { travellerDetails.push({ measurementValue: [(contPax++) + ''] }); }
        this.passengersGroup.push({ "segmentRepetitionControl": [{ "segmentControlDetails": [{ "quantity": ["2"], "numberOfUnits": [this.glb.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], "travellersID": [{ "travellerDetails": travellerDetails }], "discountPtc": [{ "valueQualifier": ["CH"] }] });
      }
      if (this.glb.flightSelected.pax[i].paxReference[0].ptc[0] == 'INF') {
        let travellerDetails = [];
        for (let l = 0; l < this.glb.flightSelected.pax[i].paxReference[0].traveller.length; l++) { travellerDetails.push({ measurementValue: [(l + 1) + ''] }); }
        this.passengersGroup.push({ "segmentRepetitionControl": [{ "segmentControlDetails": [{ "quantity": ["3"], "numberOfUnits": [this.glb.flightSelected.pax[i].paxReference[0].traveller.length + ''] }] }], "travellersID": [{ "travellerDetails": travellerDetails }], "discountPtc": [{ "valueQualifier": ["INF"], "fareDetails": [{ "qualifier": ["766"] }] }] });
      }
      console.log('passengersGroup: ', this.passengersGroup);
    }
  }


  body = {
    "soapenv:Body": {
      "Fare_InformativePricingWithoutPNR": [
        {
          "passengersGroup": this.passengersGroup,
          "segmentGroup": [
            {
              "segmentInformation": [{
                "flightDate": [{ "departureDate": ["210724"], "departureTime": ["2325"] }],
                "boardPointDetails": [{ "trueLocationId": ["BOG"] }],
                "offpointDetails": [{ "trueLocationId": ["LHR"] }],
                "companyDetails": [{ "marketingCompany": ["AV"] }],
                "flightIdentification": [{ "flightNumber": ["120"], "bookingClass": ["A"] }],
                "flightTypeDetails": [{ "flightIndicator": ["1"] }],
                "itemNumber": ["1"]
              }]
            },
            {
              "segmentInformation": [{
                "flightDate": [{ "departureDate": ["270724"], "departureTime": ["2205"] }],
                "boardPointDetails": [{ "trueLocationId": ["LHR"] }],
                "offpointDetails": [{ "trueLocationId": ["BOG"] }],
                "companyDetails": [{ "marketingCompany": ["AV"] }],
                "flightIdentification": [{ "flightNumber": ["121"], "bookingClass": ["K"] }],
                "flightTypeDetails": [{ "flightIndicator": ["1"] }],
                "itemNumber": ["2"]
              }
              ]
            }
          ],
          "pricingOptionGroup": [
            { "pricingOptionKey": [{ "pricingOptionKey": ["RP"] }] },
            { "pricingOptionKey": [{ "pricingOptionKey": ["RU"] }] },
            { "pricingOptionKey": [{ "pricingOptionKey": ["RLO"] }] }
          ]
        }
      ]
    }
  }
}

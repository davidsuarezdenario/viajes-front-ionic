import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonChip, IonText, IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonProgressBar, IonCol } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { ApiService } from "../../shared/services/api/api.service";
import { Router } from '@angular/router';
import { AlertMainService } from '../../shared/services/alert-main/alert-main.service';
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
    console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
    const bookingResponse: any = await this.apiService.post('/travel/informative_pricing_without_pnr', this.glbService.flightSelected);
    this.session = bookingResponse.session;
    this.Fare_InformativePricingWithoutPNRResponse = bookingResponse.fare;
    console.log('Fare_InformativePricingWithoutPNRResponse: ', this.Fare_InformativePricingWithoutPNRResponse);
    console.log('bookingResponse: ', bookingResponse);
    this.checkAllSeat(bookingResponse.data['soapenv:Envelope']['soapenv:Body'][0].Air_SellFromRecommendationReply[0]);
    //this.airSellFromRecommendation(bookingResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Fare_InformativePricingWithoutPNRReply[0].mainGroup[0], bookingResponse.session); No tocar
  }
  calculateTotal(response: any) {
    let total = 0;
    response.pricingGroupLevelGroup.forEach((traveller: any) => {
      const amount = traveller.fareInfoGroup[0].fareAmount[0].otherMonetaryDetails[1].amount[0], units = traveller.numberOfPax[0].segmentControlDetails[0].numberOfUnits[0];
      total += amount * units;
    });
    return total;
  }
/*   async airSellFromRecommendation(response: any, session: any) {
    this.checkAllSeat(airSellFromRecommendationResponse.data['soapenv:Envelope']['soapenv:Body'][0].Air_SellFromRecommendationReply[0]);
  } */
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
    console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
  }
  goToBookingTwo(){
    this.router.navigate(['/booking-two']); 
  }
}

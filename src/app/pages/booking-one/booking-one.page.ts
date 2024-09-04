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
    this.Fare_InformativePricingWithoutPNRResponse = bookingResponse;
    this.checkAllSeat(this.Fare_InformativePricingWithoutPNRResponse);
    //this.airSellFromRecommendation(bookingResponse.data["soapenv:Envelope"]["soapenv:Body"][0].Fare_InformativePricingWithoutPNRReply[0].mainGroup[0], bookingResponse.session); No tocar
  }
  calculateTotal(response: any) {
    let total = 0;
    total = response.ADT ? (total + (response.ADT.quantity * response.ADT.total)) : total + 0;
    total = response.CNN ? (total + (response.CNN.quantity * response.CNN.total)) : total + 0;
    total = response.INF ? (total + (response.INF.quantity * response.INF.total)) : total + 0;
    return total;
  }
  /*   async airSellFromRecommendation(response: any, session: any) {
      this.checkAllSeat(airSellFromRecommendationResponse.data['soapenv:Envelope']['soapenv:Body'][0].Air_SellFromRecommendationReply[0]);
    } */
  checkAllSeat(response: any) {
    console.log(response);
    let segRouter = true;
    for (let x = 0; x < response.data.seats.length; x++) {
      for (let y = 0; y < response.data.seats[x].details.length; y++) {
        if (response.data.seats[x].details[y].state != 'OK') {
          this.Fare_InformativePricingWithoutPNRResponse = undefined; segRouter = false;
          this.alertMain.present('Ups', 'Este vuelo no está disponible', 'Intenta con otro vuelo.');
          x = response.data.seats.length; this.location.back(); return;
        }
      }
    }
    segRouter ? this.glbService.passengersData = response : false;
    this.glbService.flightSelected.fare = response.fare;
    this.glbService.flightSelected.seats = response.data.seats;
    console.log('this.glbService.flightSelected: ', this.glbService.flightSelected);
  }
  goToBookingTwo() {
    this.router.navigate(['/booking-two']);
  }
}

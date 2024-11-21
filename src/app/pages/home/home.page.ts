import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonHeader, IonProgressBar, IonToolbar, IonGrid, IonRow, IonCol, IonContent, IonCard, IonText, IonChip, IonLabel, IonTitle, IonButton, IonSkeletonText } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { SearchMainComponent } from "../../shared/components/search-main/search-main.component";
import { ApiService } from "../../shared/services/api/api.service";
import { GlbService } from "../../shared/services/glb/glb.service";
import { BookingComponent } from "../../shared/components/booking/booking.component";
import { BookingSkeletonComponent } from "../../shared/components/booking-skeleton/booking-skeleton.component";
import { AlertMainService } from "../../shared/services/alert-main/alert-main.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonButton, IonTitle, IonLabel, IonChip, IonText, IonCard, IonContent, IonCol, IonRow, IonGrid, IonToolbar, IonProgressBar, IonHeader, CommonModule, FormsModule, HeaderMainComponent, SearchMainComponent, BookingComponent, BookingSkeletonComponent],
})
export class HomePage implements OnInit {

  mainBanner1: string = "¡Viaja ahora";
  mainBanner2: string = "paga después!";
  lettersBanner1: string[] = [];
  lettersBanner2: string[] = [];


  constructor(
    private apiService: ApiService,
    public glbService: GlbService,
    public alertMain: AlertMainService
  ) {
    this.lettersBanner1 = this.mainBanner1.split("");
    this.lettersBanner2 = this.mainBanner2.split("");
  }

  async ngOnInit() {
    await this.getDatosInit();
    this.getIataCodes();
  }

  async getDatosInit() {
    this.glbService.bookingloading = true;
    try {
      if (await this.apiService.verifySesion()) {
        const res: any = await this.apiService.post('/users/init-data', { idCliente: this.glbService.idCliente });
        if (!res.Error) {
          if (res.Data){
            this.glbService.userData = res.Data;
            console.log('userData: ', this.glbService.userData);
            this.glbService.bookingloading = false;
            this.processDataInit(this.glbService.userData);
            return;
          }else{
            this.glbService.bookingloading = false;
            this.alertMain.present('Error', 'Error al obtener los datos iniciales, Cod: 1', 'No se encontraron datos');
          }
        }
        this.glbService.bookingloading = false;
        this.alertMain.present('Error', 'Error al obtener los datos iniciales, Cod: 2', res.Message);
      }
    } catch (error: any) {
      console.error('Error al obtener los datos iniciales: ', error);
      this.glbService.bookingloading = false;
      this.alertMain.present('Error', 'Error al obtener los datos iniciales, Cod: 3', error?.Message);
    }
    this.glbService.bookingloading = false;
  }

  async getIataCodes() {
    try {
      const res: any = await this.apiService.get('/travel/iata_codes');
      !res.error ? this.glbService.iataCodes = res.data : this.alertMain.present('Error', 'Error al obtener los códigos IATA, Cod: 1');
      console.log('res: ', this.glbService.iataCodes);
    } catch (error: any) {
      this.alertMain.present('Error', 'Error al obtener los datos iniciales, Cod: 2', error?.Message);
    }
  }

  processDataInit(data: any) {
    if (data.Nombres) {
      const nombres = data.Nombres.trim().split(' ');
      data.primerNombre = nombres[0];
    }
  }

}

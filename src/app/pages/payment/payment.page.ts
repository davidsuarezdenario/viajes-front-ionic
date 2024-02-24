import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonHeader, IonProgressBar, IonToolbar, IonItem, IonGrid, IonRow, IonCol, IonContent, IonCard, IonText, IonChip, IonLabel, IonTitle, IonButton, IonSkeletonText } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { SearchMainComponent } from "../../shared/components/search-main/search-main.component";
import { ApiService } from "../../shared/services/api/api.service";
import { GlbService } from "../../shared/services/glb/glb.service";
import { BookingComponent } from "../../shared/components/booking/booking.component";
import { BookingSkeletonComponent } from "../../shared/components/booking-skeleton/booking-skeleton.component";
import { AlertMainService } from "../../shared/services/alert-main/alert-main.service";

@Component({
  selector: 'app-home',
  templateUrl: 'payment.page.html',
  styleUrls: ['payment.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonButton, IonTitle, IonLabel, IonChip, IonText, IonCard, IonContent, IonCol, IonRow, IonGrid, IonToolbar, IonProgressBar, IonHeader, IonItem, CommonModule, FormsModule, HeaderMainComponent, SearchMainComponent, BookingComponent, BookingSkeletonComponent],
})
export class PaymentPage implements OnInit {

  mainBanner1: string = "¡Viaja ahora";
  mainBanner2: string = "paga después!";
  lettersBanner1: string[] = [];
  lettersBanner2: string[] = [];
  formData = {
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    nacionalidad: ''
  };


  constructor(
    private apiService: ApiService,
    public glbService: GlbService,
    public alertMain: AlertMainService
  ) {
    this.lettersBanner1 = this.mainBanner1.split("");
    this.lettersBanner2 = this.mainBanner2.split("");
  }

  ngOnInit() {
    
  }
  submitForm() {
    // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP o realizar alguna acción con ellos
    console.log(this.formData);
  }
}

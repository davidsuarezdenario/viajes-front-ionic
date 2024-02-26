import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonProgressBar, IonCol } from "@ionic/angular/standalone";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";

@Component({
  selector: 'app-booking-one',
  templateUrl: './booking-one.page.html',
  styleUrls: ['./booking-one.page.scss'],
  standalone: true,
  imports: [IonCol, IonProgressBar, IonRow, IonGrid, IonBackButton, IonButtons, IonToolbar, IonTitle, IonContent, IonHeader, CommonModule, FormsModule, HeaderMainComponent]
})
export class BookingOnePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonText, IonIcon, IonFab, IonFabButton, IonSpinner, IonCard, IonSkeletonText } from "@ionic/angular/standalone";

@Component({
  selector: 'app-booking-skeleton',
  templateUrl: './booking-skeleton.component.html',
  styleUrls: ['./booking-skeleton.component.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonCard,  IonSpinner, IonFabButton, IonFab, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonText, IonIcon]
})
export class BookingSkeletonComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

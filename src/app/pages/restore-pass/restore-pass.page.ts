import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restore-pass',
  templateUrl: './restore-pass.page.html',
  styleUrls: ['./restore-pass.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput]
})
export class RestorePassPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

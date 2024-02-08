import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { menu, personCircle } from "ionicons/icons";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, RouterLink],
})
export class HeaderMainComponent  implements OnInit {

  constructor() { 
    addIcons({ menu, personCircle });
  }

  ngOnInit() {}

}

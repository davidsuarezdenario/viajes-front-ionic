import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { menu, personCircle } from "ionicons/icons";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol],
})
export class HeaderMainComponent  implements OnInit {

  constructor() { 
    addIcons({ menu, personCircle });
  }

  ngOnInit() {}

}

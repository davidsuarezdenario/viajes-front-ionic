import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { SearchMainComponent } from "../search-main/search-main.component";
import { addIcons } from 'ionicons'; 
import { menu } from "ionicons/icons";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonLabel, SearchMainComponent, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol],
})
export class HeaderMainComponent  implements OnInit {

  constructor() { 
    addIcons({ menu });
  }

  ngOnInit() {}

}

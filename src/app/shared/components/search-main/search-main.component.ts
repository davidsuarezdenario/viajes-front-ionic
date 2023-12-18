import { Component, OnInit } from '@angular/core';
import { IonItem, IonLabel, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { search } from "ionicons/icons";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonInput, IonIcon, IonButton],
})
export class SearchMainComponent  implements OnInit {

  constructor() { 
    addIcons({search });
  }

  ngOnInit() { }

}

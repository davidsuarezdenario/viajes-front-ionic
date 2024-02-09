import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonButton, IonList, IonItem, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { GlbService } from "../../services/glb/glb.service";
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons'; 
import { home, person, settings } from "ionicons/icons";

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss'],
  standalone: true,
  imports: [IonMenu, IonHeader, CommonModule, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonButton, IonList, IonItem, IonIcon, IonLabel, RouterLink]
})
export class MenuMainComponent  implements OnInit {

  constructor(
    public glbService: GlbService
  ) { 
    addIcons({ home, person, settings });
  }

  ngOnInit() {}

  logout() {
    localStorage.removeItem('wanderlustpay-sesion');
    window.location.reload();
  }

}

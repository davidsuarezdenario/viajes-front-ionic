import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText } from '@ionic/angular/standalone';
import { HeaderMainComponent } from "../shared/components/header-main/header-main.component";
import { SearchMainComponent } from "../shared/components/search-main/search-main.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, HeaderMainComponent, SearchMainComponent, IonGrid, IonRow, IonCol, IonCard, IonText ],
})
export class HomePage {

  mainBanner1: string = "¡Viaja ahora";
  mainBanner2: string = "paga después!";
  lettersBanner1: string[] = [];
  lettersBanner2: string[] = [];

  constructor() {
    this.lettersBanner1 = this.mainBanner1.split("");
    this.lettersBanner2 = this.mainBanner2.split("");
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonMenuToggle, IonText, IonChip } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menu, personCircle } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { MenuMainComponent } from "../menu-main/menu-main.component";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.scss'],
  standalone: true,
  imports: [IonChip, IonText, CommonModule, IonHeader, IonToolbar, IonLabel, IonButtons, IonButton, IonIcon, IonGrid, IonRow, IonCol, RouterLink, MenuMainComponent, IonMenuToggle],
})
export class HeaderMainComponent implements OnInit {

  constructor(
    public glbService: GlbService,
    private router: Router
  ) {
    addIcons({ menu, personCircle });
  }

  ngOnInit() { }

  goHome() {
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { IonPopover, IonContent, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote } from "@ionic/angular/standalone";
import { GlbService } from "../../services/glb/glb.service";
import { addIcons } from 'ionicons';
import { personOutline, removeOutline, addOutline, happyOutline, balloonOutline } from "ionicons/icons";

@Component({
  selector: 'app-select-pasajeros',
  templateUrl: './select-pasajeros.component.html',
  styleUrls: ['./select-pasajeros.component.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonPopover, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote]
})
export class SelectPasajerosComponent  implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen = false;

  constructor(
    public glbService: GlbService
  ) { 
    addIcons({ personOutline, removeOutline, addOutline, happyOutline, balloonOutline});
  }

  ngOnInit() {}

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  increment(passengerType: string) {
    this.glbService.passengers[passengerType]++;
  }

  decrement(passengerType: string) {
    if (this.glbService.passengers[passengerType] > 0) {
      this.glbService.passengers[passengerType]--;
    }
  }

}

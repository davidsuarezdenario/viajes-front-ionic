import { Component, OnInit, ViewChild } from '@angular/core';
import { IonPopover, IonContent, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote, IonText, IonTitle, IonToolbar, IonHeader } from "@ionic/angular/standalone";
import { GlbService } from "../../services/glb/glb.service";
import { addIcons } from 'ionicons';
import { personOutline, removeOutline, addOutline, happyOutline, balloonOutline } from "ionicons/icons";
import { SearchMainService } from "../../services/search-main/search-main.service";

@Component({
  selector: 'app-select-pasajeros',
  templateUrl: './select-pasajeros.component.html',
  styleUrls: ['./select-pasajeros.component.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonText, IonButtons, IonContent, IonPopover, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote]
})
export class SelectPasajerosComponent  implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen = false;
  passengers: any = {
    adult: 0,
    child: 0,
    infant: 0
  };
  get totalPassengers() { return this.passengers.adult + this.passengers.child + this.passengers.infant; }

  constructor(
    public glbService: GlbService,
    private searchMainService: SearchMainService
  ) { 
    addIcons({ personOutline, removeOutline, addOutline, happyOutline, balloonOutline});
  }

  ngOnInit() {
    this.passengers = {...this.glbService.passengers};
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  increment(passengerType: string) {
    this.passengers[passengerType]++;
  }

  decrement(passengerType: string) {
    if (this.passengers[passengerType] > 0) {
      this.passengers[passengerType]--;
    }
  }

  accept() {
    this.glbService.passengers = this.passengers;
    this.isOpen = false;
    if( !this.glbService.firstSearch){
      this.searchMainService.explorar();
    }
  }

}

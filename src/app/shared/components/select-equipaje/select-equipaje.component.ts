import { Component, OnInit, ViewChild } from '@angular/core';
import { IonPopover, IonContent,IonButtons, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote  } from "@ionic/angular/standalone";
import { GlbService } from "../../services/glb/glb.service";
import { addIcons } from 'ionicons';
import { removeOutline, addOutline, bagHandleOutline, bagCheckOutline} from "ionicons/icons";

@Component({
  selector: 'app-select-equipaje',
  templateUrl: './select-equipaje.component.html',
  styleUrls: ['./select-equipaje.component.scss'],
  standalone: true,
  imports: [IonPopover, IonContent, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote]
})
export class SelectEquipajeComponent implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen = false;

  constructor(
    public glbService: GlbService
  ) { 
    addIcons({ removeOutline, addOutline, bagHandleOutline, bagCheckOutline});
  }

  ngOnInit() { }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  increment(luggageType: string) {
    this.glbService.bags[luggageType]++;
  }

  decrement(luggageType: string) {
    if (this.glbService.bags[luggageType] > 0) {
      this.glbService.bags[luggageType]--;
    }
  }

  get disableAddHoldBags(): boolean {
    if(this.glbService.bags.hold >= this.glbService.totalPassengers * 2) {
      return true;
    }
    return false;
  }
  
  get disableAddHandBags(): boolean {
    if(this.glbService.bags.hand >= this.glbService.totalPassengers) {
      return true;
    }
    return false;
  }
}

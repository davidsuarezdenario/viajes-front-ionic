import { Component, OnInit, ViewChild } from '@angular/core';
import { IonPopover, IonContent,IonButtons, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote, IonText, IonTitle, IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { GlbService } from "../../services/glb/glb.service";
import { addIcons } from 'ionicons';
import { removeOutline, addOutline, bagHandleOutline, bagCheckOutline} from "ionicons/icons";
import { SearchMainService } from "../../services/search-main/search-main.service";

@Component({
  selector: 'app-select-equipaje',
  templateUrl: './select-equipaje.component.html',
  styleUrls: ['./select-equipaje.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonHeader, IonTitle, IonText, IonPopover, IonContent, IonButtons, IonList, IonItem, IonLabel, IonIcon, IonButton, IonNote]
})
export class SelectEquipajeComponent implements OnInit {
  @ViewChild('popover') popover: any;

  isOpen = false;
  bags: any = {
    hand: 0,
    hold: 0
  }
  get totalBags() { return this.bags.hand + this.bags.hold; }
  maxBags = 0;

  constructor(
    public glbService: GlbService,
    private searchMainService: SearchMainService
  ) { 
    addIcons({ removeOutline, addOutline, bagHandleOutline, bagCheckOutline});
  }

  ngOnInit() {
    this.bags = {...this.glbService.bags};
    this.maxBags = this.glbService.totalPassengers * 3;
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  increment(luggageType: string) {
    this.bags[luggageType]++;
  }

  decrement(luggageType: string) {
    if (this.bags[luggageType] > 0) {
      this.bags[luggageType]--;
    }
  }

  get disableAddHoldBags(): boolean {
    if(this.bags.hold >= this.glbService.totalPassengers * 2) {
      return true;
    }
    return false;
  }
  
  get disableAddHandBags(): boolean {
    if(this.bags.hand >= this.glbService.totalPassengers) {
      return true;
    }
    return false;
  }

  accept() {
    this.glbService.bags = this.bags;
    this.isOpen = false;
    if( !this.glbService.firstSearch){
      this.searchMainService.explorar();
    }
  }
}

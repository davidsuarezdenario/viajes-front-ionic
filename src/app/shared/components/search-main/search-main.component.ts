import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonText, IonIcon, IonFab, IonFabButton, IonSpinner } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronExpand, people, bag, repeatOutline, returnUpForwardOutline, search, shareSocialOutline, moveOutline, reloadOutline } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { SearchMainService } from "../../services/search-main/search-main.service";
import { SelectPasajerosComponent } from "../select-pasajeros/select-pasajeros.component";
import { SelectEquipajeComponent } from "../select-equipaje/select-equipaje.component";
import { DateSelectComponent } from "../date-select/date-select.component";
import { ModalAirportsComponent } from "../modal-airports/modal-airports.component";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonFabButton, IonFab, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonText, SelectPasajerosComponent, SelectEquipajeComponent, IonIcon, DateSelectComponent, ModalAirportsComponent]
})
export class SearchMainComponent implements OnInit {

  constructor(
    public glbService: GlbService,
    public searchMainService: SearchMainService,
  ) {
    addIcons({ chevronExpand, people, bag, repeatOutline, returnUpForwardOutline, search, shareSocialOutline, moveOutline, reloadOutline});
  }

  ngOnInit() { }

  getDateFrom(event: any) {
    console.log('event getDateFrom: ', event);
  }

  change(){
    if( !this.glbService.firstSearch){
      this.searchMainService.explorar();
    }
  }

  changeOriginDestination(){
    const originSearch = this.glbService.searchFrom ;
    const originAirport = this.glbService.selectAirportFrom;
    this.glbService.searchFrom = this.glbService.searchTo;
    this.glbService.selectAirportFrom = this.glbService.selectAirportTo;
    this.glbService.searchTo = originSearch;
    this.glbService.selectAirportTo = originAirport;
    if( !this.glbService.firstSearch){
      this.searchMainService.explorar();
    }
  }

}

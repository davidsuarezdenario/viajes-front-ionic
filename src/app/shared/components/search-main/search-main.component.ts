import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonInput, IonText, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronExpand } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
/* import { ApiService } from "../../services/api/api.service"; */
import { PopoverAirportsComponent } from "../popover-airports/popover-airports.component";
import { SelectPasajerosComponent } from "../select-pasajeros/select-pasajeros.component";
import { SelectEquipajeComponent } from "../select-equipaje/select-equipaje.component";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, PopoverAirportsComponent, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonInput, IonText, SelectPasajerosComponent, SelectEquipajeComponent, IonIcon]
})
export class SearchMainComponent implements OnInit {
  @ViewChild(PopoverAirportsComponent) popoverAirportsComponent!: PopoverAirportsComponent;
  @ViewChild(SelectPasajerosComponent) selectPasajerosComponent!: SelectPasajerosComponent;
  @ViewChild(SelectEquipajeComponent) selectEquipajeComponent!: SelectEquipajeComponent;

  constructor(
    public glbService: GlbService,
    /* private apiService: ApiService */
  ) {
    addIcons({ chevronExpand });
  }

  ngOnInit() { }

  explorar() {
    console.log('airport from: ', this.glbService.selectAirportFrom);
    console.log('airport to: ', this.glbService.selectAirportTo);
  }

}

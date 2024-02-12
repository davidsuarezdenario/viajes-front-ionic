import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonInput, IonText, IonIcon, IonLabel, IonDatetime, IonDatetimeButton, IonModal, IonSpinner, IonFab, IonFabButton } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronExpand, people, bag, repeatOutline, returnUpForwardOutline, search } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";
import { PopoverAirportsComponent } from "../popover-airports/popover-airports.component";
import { SelectPasajerosComponent } from "../select-pasajeros/select-pasajeros.component";
import { SelectEquipajeComponent } from "../select-equipaje/select-equipaje.component";
import { DateSelectComponent } from "../date-select/date-select.component";
import { AlertMainComponent } from "../alert-main/alert-main.component";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonSpinner, IonModal, IonDatetimeButton, IonDatetime, IonLabel, CommonModule, FormsModule, PopoverAirportsComponent, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonInput, IonText, SelectPasajerosComponent, SelectEquipajeComponent, IonIcon, DateSelectComponent, AlertMainComponent]
})
export class SearchMainComponent implements OnInit {
  @ViewChild(PopoverAirportsComponent) popoverAirportsComponent!: PopoverAirportsComponent;
  @ViewChild(SelectPasajerosComponent) selectPasajerosComponent!: SelectPasajerosComponent;
  @ViewChild(SelectEquipajeComponent) selectEquipajeComponent!: SelectEquipajeComponent;
  @ViewChild(AlertMainComponent) alertMainComponent!: AlertMainComponent;

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) {
    addIcons({ chevronExpand, people, bag, repeatOutline, returnUpForwardOutline, search });
  }

  ngOnInit() { }

  getDateFrom(event: any) {
    console.log('event getDateFrom: ', event);
  }

  async explorar() {
    console.log('trips: ', this.glbService.trips);
    console.log('clase: ', this.glbService.clase);
    console.log('passengers: ', this.glbService.passengers);
    console.log('bags: ', this.glbService.bags);
    console.log('airport from: ', this.glbService.selectAirportFrom);
    console.log('airport to: ', this.glbService.selectAirportTo);
    console.log('date from: ', this.glbService.dateFrom);
    console.log('date to: ', this.glbService.dateTo);
    const body = {
      "fly_from": this.glbService.selectAirportFrom.code,
      "fly_to":  this.glbService.selectAirportTo.code,
      "date_from": this.glbService.dateFrom,//yyyy-mm-dd
      "date_to": this.glbService.dateTo,//yyyy-mm-dd
      "nights_in_dst_from": "2",//yo
      "nights_in_dst_to": "2",//yo
      "max_fly_duration": "20",
      "adults": this.glbService.passengers.adult,
      "adult_hold_bag": this.glbService.bags.hold,
      "adult_hand_bag": this.glbService.bags.hand,
      "children": this.glbService.passengers.child,
      "child_hold_bag": "0",
      "child_hand_bag": "0",
      "infants": this.glbService.passengers.infant,
      "selected_cabins": this.glbService.clase
    }
    console.log('body: ', body);
    if (!this.validators()) return;
    try {
      this.glbService.bookingloading = true;
      const bookingResponse:any = await this.apiService.post('/travel/booking', body);
      console.log('bookingResponse: ', bookingResponse);
      if (bookingResponse.data.data.length > 0) {
        this.glbService.bookingResults = bookingResponse.data.data;
        return;
      }
      const alertButtons = [ { text: 'OK', role: 'confirm', handler: () => { console.log('Alert confirmed'); this.glbService.bookingResults = []; }, } ];
      this.alertMainComponent.setOpen(true, 'Ups', 'No se encontraron vuelos', 'Intenta con otros parametros de busquda.', alertButtons);
    } catch(e) {
      console.error('error bookingResponse: ', e);
      this.alertMainComponent.setOpen(true, 'Error', 'Al consultar vuelos', JSON.stringify(e));
    } finally {
      this.glbService.bookingloading = false;
    }
  }

  validators(): boolean {
    const conditions = [
      {
        condition: !this.glbService.selectAirportFrom.code,
        message: 'Seleccione un aeropuerto de origen'
      },
      {
        condition: !this.glbService.selectAirportTo.code,
        message: 'Seleccione un aeropuerto de destino'
      },
      {
        condition: !this.glbService.dateFrom,
        message: 'Seleccione una fecha de salida'
      },
      {
        condition: this.glbService.totalPassengers <= 0,
        message: 'Seleccione al menos un pasajero'
      }
    ];
  
    for (let item of conditions) {
      if (item.condition) {
        this.alertMainComponent.setOpen(true, 'Error', 'Datos incompletos', item.message);
        return false;
      }
    }
  
    return true;
  }

}

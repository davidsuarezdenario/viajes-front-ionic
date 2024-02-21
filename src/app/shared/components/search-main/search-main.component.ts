import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonText, IonIcon, IonFab, IonFabButton, IonSpinner } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { chevronExpand, people, bag, repeatOutline, returnUpForwardOutline, search, shareSocialOutline, moveOutline } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";
import { SelectPasajerosComponent } from "../select-pasajeros/select-pasajeros.component";
import { SelectEquipajeComponent } from "../select-equipaje/select-equipaje.component";
import { DateSelectComponent } from "../date-select/date-select.component";
import { AlertMainComponent } from "../alert-main/alert-main.component";
import { ModalAirportsComponent } from "../modal-airports/modal-airports.component";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonFabButton, IonFab, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonButton, IonText, SelectPasajerosComponent, SelectEquipajeComponent, IonIcon, DateSelectComponent, AlertMainComponent, ModalAirportsComponent]
})
export class SearchMainComponent implements OnInit {
  @ViewChild(SelectPasajerosComponent) selectPasajerosComponent!: SelectPasajerosComponent;
  @ViewChild(SelectEquipajeComponent) selectEquipajeComponent!: SelectEquipajeComponent;
  @ViewChild(AlertMainComponent) alertMainComponent!: AlertMainComponent;

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) {
    addIcons({ chevronExpand, people, bag, repeatOutline, returnUpForwardOutline, search, shareSocialOutline, moveOutline });
  }

  ngOnInit() { }

  getDateFrom(event: any) {
    console.log('event getDateFrom: ', event);
  }

  totalBagsHoldToDistribute: number = 0;
  bagsHoldDistributionFunc(persons: number): string {
    const maxBagsPerAdult = 2;
    let bagDistribution = Array(persons).fill(0);
    let totalBags = this.totalBagsHoldToDistribute;
    for (let i = 0; i < totalBags; i++) {
      if (bagDistribution[i % persons] < maxBagsPerAdult) {
        bagDistribution[i % persons]++;
        this.totalBagsHoldToDistribute--;
      }
    }
    return bagDistribution.join(',');
  }

  totalBagsHandToDistribute: number = 0;
  bagsHandDistributionFunc(persons: number): string {
    const maxBagsPerAdult = 1;
    let bagDistribution = Array(persons).fill(0);
    let totalBags = this.totalBagsHandToDistribute;
    for (let i = 0; i < totalBags; i++) {
      if (bagDistribution[i % persons] < maxBagsPerAdult) {
        bagDistribution[i % persons]++;
        this.totalBagsHandToDistribute--;
      }
    }
    return bagDistribution.join(',');
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
    this.totalBagsHoldToDistribute = this.glbService.bags.hold;
    this.totalBagsHandToDistribute = this.glbService.bags.hand;
    const body = {
      "fly_from": this.glbService.selectAirportFrom.code,
      "fly_to": this.glbService.selectAirportTo.code,
      "date_from": this.glbService.selectedDateSalidaStart,//yyyy-mm-dd
      "date_to": this.glbService.selectedDateSalidaEnd,//yyyy-mm-dd
      "return_from": this.glbService.trips=='idaVuelta' ? this.glbService.selectedDateRegresoStart : '',//yyyy-mm-dd
      "return_to": this.glbService.trips=='idaVuelta' ? this.glbService.selectedDateRegresoEnd : '',//yyyy-mm-dd
      /* "nights_in_dst_from": "2", */
      /* "nights_in_dst_to": "2", */
      "max_fly_duration": "20",
      "adults": this.glbService.passengers.adult,
      "adult_hold_bag": this.bagsHoldDistributionFunc(this.glbService.passengers.adult),
      "adult_hand_bag": this.bagsHandDistributionFunc(this.glbService.passengers.adult),
      "children": this.glbService.passengers.child,
      "child_hold_bag": this.bagsHoldDistributionFunc(this.glbService.passengers.child),
      "child_hand_bag": this.bagsHandDistributionFunc(this.glbService.passengers.child),
      "infants": this.glbService.passengers.infant,
      "selected_cabins": this.glbService.clase,
      "limit": 50,
    }
    console.log('body: ', body);
    if (!this.validators()) return;
    try {
      this.glbService.bookingloading = true;
      const bookingResponse: any = await this.apiService.post('/travel/booking', body);
      console.log('bookingResponse: ', bookingResponse);
      if (bookingResponse.data.error) {
        this.alertMainComponent.setOpen(true, 'Error', 'Al consultar vuelos', bookingResponse.data.error);
        return;
      }
      if (bookingResponse.data.data.length > 0) {
        this.glbService.bookingResults = bookingResponse.data.data;
        this.glbService.firstSearch = false;
        return;
      }
      const alertButtons = [{ text: 'OK', role: 'confirm', handler: () => { console.log('Alert confirmed'); this.glbService.bookingResults = []; }, }];
      this.alertMainComponent.setOpen(true, 'Ups', 'No se encontraron vuelos', 'Intenta con otros parametros de busquda.', alertButtons);
    } catch (e) {
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

  change(){
    console.log('*****change');
    this.glbService.bookingResults = [];
  }

}

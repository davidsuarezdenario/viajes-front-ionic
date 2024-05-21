import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonItem, IonLabel, IonDatetime, IonButton, IonModal, IonPopover, IonText, IonIcon, IonCol } from "@ionic/angular/standalone";
import { format, parseISO, formatISO } from 'date-fns';
import { GlbService } from "../../services/glb/glb.service";
import { addIcons } from 'ionicons';
import { closeCircleOutline } from "ionicons/icons";
import { SearchMainService } from "../../services/search-main/search-main.service";

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  standalone: true,
  imports: [IonCol, IonIcon, IonText, IonPopover, IonButton, IonDatetime, IonLabel, IonItem, FormsModule, CommonModule, IonModal],
})
export class DateSelectComponent implements OnInit {
  @Input() label: string = "";
  @ViewChild('modal') modal!: IonModal;
  /* dateStart = new Date().toISOString();
  dateEnd = new Date().toISOString(); */
  dateStart = this.glb.today;
  dateEnd = this.glb.today;
  dateStartString = format(parseISO(this.dateStart), 'yyyy-MM-dd');
  dateEndString = format(parseISO(this.dateEnd), 'yyyy-MM-dd');
  isModalOpen = false;

  constructor(
    public glb: GlbService,
    private searchMainService: SearchMainService
  ) {
    addIcons({ closeCircleOutline });
  }

  ngOnInit() {
  }

  presentModal(isOpen: boolean) {
    this.dateStart = this.label == "Salida" ? formatISO(parseISO(this.glb.selectedDateSalidaStart)) : formatISO(parseISO(this.glb.selectedDateRegresoStart));
    this.dateEnd = this.label == "Salida" ? formatISO(parseISO(this.glb.selectedDateSalidaEnd)) : formatISO(parseISO(this.glb.selectedDateRegresoEnd));
    this.isModalOpen = isOpen;
  }

  changeDate() {
    if (this.dateEnd < this.dateStart) {
      this.dateEnd = this.dateStart;
    }
    this.dateStartString = format(parseISO(this.dateStart), 'yyyy-MM-dd');
    this.dateEndString = format(parseISO(this.dateEnd), 'yyyy-MM-dd');
    /* this.dateStartString = format(parseISO(this.dateStart), 'ddMMyy');
    this.dateEndString = format(parseISO(this.dateEnd), 'ddMMyy'); */
    console.log('dateStartString: ', this.dateStartString);
    console.log('dateEndString: ', this.dateEndString);
  }

  accept() {
    if (this.label == "Salida") {
      this.glb.selectedDateSalidaStart = this.dateStartString;
      this.glb.selectedDateSalidaEnd = this.dateEndString;
    } else {
      this.glb.selectedDateRegresoStart = this.dateStartString;
      this.glb.selectedDateRegresoEnd = this.dateEndString;
    }
    if (this.glb.selectedDateSalidaEnd > this.glb.selectedDateRegresoStart) {
      this.glb.selectedDateRegresoStart = this.glb.selectedDateSalidaEnd;
      this.glb.selectedDateRegresoEnd = this.glb.selectedDateSalidaEnd;
    }
    this.isModalOpen = false;
    if (!this.glb.firstSearch) {
      this.searchMainService.explorar();
    }
  }

  get selectedDateRangeLabel() {
    let startDate, endDate;
    if (this.label === 'Salida') {
      startDate = this.glb.selectedDateSalidaStart;
      endDate = this.glb.selectedDateSalidaEnd;
    } else if (this.label === 'Regreso') {
      startDate = this.glb.selectedDateRegresoStart;
      endDate = this.glb.selectedDateRegresoEnd;
    }
    return startDate === endDate ? startDate : `${startDate} al ${endDate}`;
  }

}

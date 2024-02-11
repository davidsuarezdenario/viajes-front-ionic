import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { ModalController } from "@ionic/angular";
import { IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonButton } from "@ionic/angular/standalone";
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  standalone: true,
  imports: [IonButton, IonDatetime, IonModal, IonDatetimeButton, IonLabel, IonItem, FormsModule, CommonModule]
})
export class DateSelectComponent  implements OnInit {
  @Input() label: string = "";
  @Input() ref: string = "datetime";
  @Output() dateSelected = new EventEmitter<string>();
  date = new Date().toISOString();

  constructor(
    public modalController: ModalController
  ) {}

  ngOnInit() {}

  accept(){
    console.log('date: ', this.date);
    const dateObject = parseISO(this.date);
    const formattedDate = format(dateObject, 'dd/MM/yyyy');
    console.log('formattedDate: ', formattedDate);
    this.dateSelected.emit(formattedDate);
    this.modalController.dismiss();
  }

}

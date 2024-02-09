import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { IonButton, IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'app-alert-main',
  templateUrl: './alert-main.component.html',
  styleUrls: ['./alert-main.component.scss'],
  standalone: true,
  imports: [IonButton, IonAlert],
})
export class AlertMainComponent  implements OnInit {

  isAlertOpen = false;
  header = '';
  subHeader = '';
  message = '';
  alertButtons = ['Action'];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isAlertOpen']) {
      console.log('alert-main isAlertOpen changed: ', this.isAlertOpen);
      /* this.setOpen(this.isAlertOpen); */
    }
  }

  setOpen(isOpen: boolean, header: string='', subHeader: string='', message: string='', buttons: string[]=['ok']) {
    console.log('alert-main setOpen: ', isOpen);
    this.header = header;
    this.subHeader = subHeader;
    this.message = message;
    this.alertButtons = buttons;
    this.isAlertOpen = isOpen;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime } from "@ionic/angular/standalone";

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
  standalone: true,
  imports: [IonDatetime, IonModal, IonDatetimeButton, IonLabel, IonItem, FormsModule, CommonModule]
})
export class DateSelectComponent  implements OnInit {
  @Input() label: string = "";
  @Input() ref: string = "datetime";

  constructor() {}

  ngOnInit() {}

}

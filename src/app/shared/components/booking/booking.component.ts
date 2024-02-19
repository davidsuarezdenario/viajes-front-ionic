import { Component, OnInit, Input } from '@angular/core';
import { IonCard, IonGrid, IonRow, IonCardHeader, IonCol, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from "@ionic/angular/standalone";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { format, differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonCol, IonCardHeader, IonRow, IonGrid, IonCard, DatePipe, CurrencyPipe],
  providers: [DatePipe, CurrencyPipe]
})
export class BookingComponent  implements OnInit {
  @Input() flight: any;

  constructor() { }

  ngOnInit() {}

  formatDate(date: string) {
    return format(new Date(date), 'EEE dd/MM');
  }

  formatTime(date: string) {
    return format(new Date(date), 'HH:mm');
  }

  formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

}

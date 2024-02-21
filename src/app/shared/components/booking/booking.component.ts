import { Component, OnInit, Input } from '@angular/core';
import { IonCard, IonGrid, IonRow, IonCardHeader, IonCol, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonImg, IonText } from "@ionic/angular/standalone";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { format } from 'date-fns';
import { GlbService } from "../../services/glb/glb.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonCol, IonCardHeader, IonRow, IonGrid, IonCard, DatePipe, CurrencyPipe],
  providers: [DatePipe, CurrencyPipe]
})
export class BookingComponent  implements OnInit {
  @Input() flight: any;

  constructor(
    public glb: GlbService
  ) {}

  ngOnInit() {
    console.log('flight: ',this.flight);
  }

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

  getScales(type: string): number{
    const returnType = type === 'outbound' ? 0 : 1;
    return this.flight.route.filter((segment: any) => segment.return === returnType).length - 1;
  }

  getFirstDeparturelSegment(): string {
    const segment = this.flight.route
      .filter((segment:any) => segment.return === 1)
      .sort((a:any, b:any) => new Date(a.local_departure).getTime() - new Date(b.local_departure).getTime());
    if (segment.length === 0) {
      return "";
    }
    const lastSegment = segment[0].local_departure;
    const lastSegmentTime = format(new Date(lastSegment), 'EEE dd/MM');
    console.log('lastSegment: ',lastSegmentTime);
    return lastSegmentTime;
  }
  
  getLastArrivalSegment(): string {
    const segment = this.flight.route
      .filter((segment:any) => segment.return === 1)
      .sort((a:any, b:any) => new Date(a.local_arrival).getTime() - new Date(b.local_arrival).getTime());
    if (segment.length === 0) {
      return "";
    }
    const lastSegment = segment[segment.length - 1].local_arrival;
    const lastSegmentTime = format(new Date(lastSegment), 'EEE dd/MM');
    console.log('lastSegment: ',lastSegmentTime);
    return lastSegmentTime;
  }
  
  getFirstDeparturelSegmentTime(): string {
    const segment = this.flight.route
      .filter((segment:any) => segment.return === 1)
      .sort((a:any, b:any) => new Date(a.local_departure).getTime() - new Date(b.local_departure).getTime());
    if (segment.length === 0) {
      return "";
    }
    const lastSegment = segment[0].local_departure;
    const lastSegmentTime = format(new Date(lastSegment), 'HH:mm');
    console.log('lastSegment: ',lastSegmentTime);
    return lastSegmentTime;
  }
  
  getLastArrivalSegmentTime(): string {
    const segment = this.flight.route
      .filter((segment:any) => segment.return === 1)
      .sort((a:any, b:any) => new Date(a.local_arrival).getTime() - new Date(b.local_arrival).getTime());
    if (segment.length === 0) {
      return "";
    }
    const lastSegment = segment[segment.length - 1].local_arrival;
    const lastSegmentTime = format(new Date(lastSegment), 'HH:mm');
    console.log('lastSegment: ',lastSegmentTime);
    return lastSegmentTime;
  }

}

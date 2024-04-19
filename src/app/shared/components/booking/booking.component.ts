import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonPopover, IonContent, IonCard, IonGrid, IonRow, IonCardHeader, IonCol, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonImg, IonText, IonChip, IonLabel } from "@ionic/angular/standalone";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { format } from 'date-fns';
import { GlbService } from "../../services/glb/glb.service";
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [IonPopover, IonContent, IonLabel, IonChip, IonText, IonImg, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonCol, IonCardHeader, IonRow, IonGrid, IonCard, DatePipe, CurrencyPipe, FormsModule, CommonModule],
  providers: [DatePipe, CurrencyPipe]
})
export class BookingComponent implements OnInit {
  @Input() flight: any;
  outboundSegments: any[] = [];
  returnSegments: any[] = [];

  constructor(
    public glb: GlbService,
    private router: Router
  ) { }

  ngOnInit() {
    /* console.log('flight1: ', this.flight.itineraries[0].segments[(this.flight.itineraries[0].segments.length)-1].arrival.iataCode);
    console.log('flight2: ', this.flight.itineraries[1].segments[(this.flight.itineraries[0].segments.length)-1].arrival.iataCode); */
    /* this.outboundSegments = this.sortSegments(this.filterSegments(false)); */
    this.outboundSegments = this.sortSegments(this.flight.itineraries[0].segments);
    /* this.returnSegments = this.sortSegments(this.filterSegments(true)); */
    this.returnSegments = this.sortSegments(this.flight.itineraries.length > 1 ? this.flight.itineraries[1].segments : []);
  }

  filterSegments(returnType: boolean) {
    /* return this.flight.route.filter((segment: any) => segment.return === returnType); */
  }

  sortSegments(segments: any[]) {
    return segments.sort((a: any, b: any) => new Date(a.departure).getTime() - new Date(b.departure).getTime());
  }

  formatDateTime(date: string, formatType: 'EEE dd/MM' | 'HH:mm') {
    return format(new Date(date), formatType);
  }

  formatDuration(duration1: string, duration2: string) {
    const [hours1, minutes1] = duration1.split('H').map(el => el.replace('M', '')), [hours2, minutes2] = duration2.split('H').map(el => el.replace('M', ''));
    const totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1 ? minutes1 : '00'), totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2 ? minutes2 : '00');
    const totalMinutes = totalMinutes1 + totalMinutes2;
    const hours = Math.floor(totalMinutes / 60), minutes = totalMinutes % 60;
    return `${hours}H${minutes}M`;
  }

  getScales(type: string): number {
    const returnType = type === 'outbound' ? 0 : 1;
    return this.flight.itineraries[returnType].segments.length - 1;
  }

  getStops(array: any): string {
    if (array.length > 0) {
      let stops = '';
      for (let i = 0; i < array.length; i++) { if (i == 0) { stops = `${array[i].iataCode} (${(array[i].duration).split('PT')[1]})`; } else { stops += ` - ${array[i].iataCode} (${(array[i].duration).split('PT')[1]})`; } }
      return `via ${stops}`;
    } else {
      return '';
    }
  }

  getScalesTime(date1: string, date2: string): string {
    const diff = new Date(date2).getTime() - new Date(date1).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}H${minutes}M (${hours > 4 ? 'escala larga' : 'escala corta'})`;
  }

  getSegmentTime(returnType: number, segmentType: 'local_departure' | 'local_arrival', formatType: 'EEE dd/MM' | 'HH:mm'): string {
    const segments = returnType === 0 ? this.outboundSegments : this.returnSegments;
    if (segments.length === 0) {
      return "";
    }
    const lastSegment = segmentType === 'local_departure' ? segments[0][segmentType] : segments[segments.length - 1][segmentType];
    const lastSegmentTime = format(new Date(lastSegment), formatType);
    return lastSegmentTime;
  }

  getAirlineArray(arraySegment: any): string[] {
    let airline = [];
    for (let i = 0; i < arraySegment.length; i++) { airline.push(arraySegment[i].carrierCode); }
    return [...new Set(airline)];
    /* return [...new Set(segments.map((segment: any) => segment.airline))]; */
  }

  goToBookingOne() {
    this.router.navigate(['/booking-one']);
  }

}

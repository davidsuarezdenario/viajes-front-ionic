import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { IonCard, IonGrid, IonRow, IonCardHeader, IonCol, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton, IonImg, IonText, IonChip, IonLabel } from "@ionic/angular/standalone";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { format } from 'date-fns';
import { GlbService } from "../../services/glb/glb.service";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [IonLabel, IonChip, IonText, IonImg, IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonCol, IonCardHeader, IonRow, IonGrid, IonCard, DatePipe, CurrencyPipe, FormsModule, CommonModule],
  providers: [DatePipe, CurrencyPipe]
})
export class BookingComponent implements OnInit {
  @Input() flight: any;
  outboundSegments: any[] = [];
  returnSegments: any[] = [];

  constructor(
    public glb: GlbService
  ) { }

  ngOnInit() {
    this.outboundSegments = this.sortSegments(this.filterSegments(0));
    this.returnSegments = this.sortSegments(this.filterSegments(1));
  }

  filterSegments(returnType: number) {
    return this.flight.route.filter((segment: any) => segment.return === returnType);
  }

  sortSegments(segments: any[]) {
    return segments.sort((a: any, b: any) => new Date(a.local_departure).getTime() - new Date(b.local_departure).getTime());
  }

  formatDateTime(date: string, formatType: 'EEE dd/MM' | 'HH:mm') {
    return format(new Date(date), formatType);
  }

  formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  getScales(type: string): number {
    const returnType = type === 'outbound' ? 0 : 1;
    return this.flight.route.filter((segment: any) => segment.return === returnType).length - 1;
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

  getAirlineArray(returnType: number): string[] {
    const segments = returnType === 0 ? this.outboundSegments : this.returnSegments;
    return [...new Set(segments.map((segment: any) => segment.airline))];
  }

}

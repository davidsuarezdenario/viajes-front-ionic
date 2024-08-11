import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GlbService } from '../../services/glb/glb.service';

@Component({
  selector: 'app-info-flight',
  templateUrl: './info-flight.page.html',
  styleUrls: ['./info-flight.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InfoFlightPage implements OnInit {

  constructor(public glb: GlbService) { }

  ngOnInit() {
  }

  getStops(array: any): string {
    if (array.length > 0) {
      let stops = '';
      for (let i = 0; i < array.length; i++) {
        if (i == 0) {
          stops = `${array[i].iataCode} (${(array[i].duration).split('PT')[1]})`;
        } else {
          stops += ` - ${array[i].iataCode} (${(array[i].duration).split('PT')[1]})`;
        }
      }
      return `via ${stops}`;
    } else {
      return '';
    }
  }

  /* getScalesTime(date1: string, date2: string): string {
    const diff = new Date(date2).getTime() - new Date(date1).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}H${minutes}M (${hours > 4 ? 'escala larga' : 'escala corta'})`;
  } */
  getScalesTime(date_1: string, time_1: string, date_2: string, time_2: string): string {
    const date1: string = `${date_1}-${time_1}`, date2: string = `${date_2}-${time_2}`;
    const parseDate = (dateStr: string): Date => {
      const day = parseInt(dateStr.substring(0, 2), 10);
      const month = parseInt(dateStr.substring(2, 4), 10) - 1;
      const year = 2000 + parseInt(dateStr.substring(4, 6), 10);
      const hours = parseInt(dateStr.substring(7, 9), 10);
      const minutes = parseInt(dateStr.substring(9, 11), 10);
      return new Date(year, month, day, hours, minutes);
    };
    const dateObj1 = parseDate(date1);
    const dateObj2 = parseDate(date2);
    const diffMs = dateObj2.getTime() - dateObj1.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffDays}d ${diffHours}h ${diffMinutes}m`;
  }
}

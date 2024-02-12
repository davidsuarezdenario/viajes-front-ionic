import { Component, OnInit, Input } from '@angular/core';
import { IonCard } from "@ionic/angular/standalone";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  standalone: true,
  imports: [IonCard]
})
export class BookingComponent  implements OnInit {
  @Input() booking: any;

  constructor() { }

  ngOnInit() {}

}

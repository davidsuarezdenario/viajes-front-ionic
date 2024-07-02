import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-booking-two',
  templateUrl: './booking-two.page.html',
  styleUrls: ['./booking-two.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingTwoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

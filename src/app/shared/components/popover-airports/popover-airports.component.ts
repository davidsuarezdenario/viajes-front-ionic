import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-popover-airports',
  templateUrl: './popover-airports.component.html',
  styleUrls: ['./popover-airports.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class PopoverAirportsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}

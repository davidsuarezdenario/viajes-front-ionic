import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { addIcons } from 'ionicons';
import { search } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";
import { PopoverAirportsComponent } from "../popover-airports/popover-airports.component";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, PopoverAirportsComponent],
})
export class SearchMainComponent implements OnInit {
  @ViewChild(PopoverAirportsComponent) popoverAirportsComponent!: PopoverAirportsComponent;

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) {
    addIcons({ search });
  }

  ngOnInit() { }

  explorar() {
    console.log('airport from: ', this.glbService.selectAirportFrom);
    console.log('airport to: ', this.glbService.selectAirportTo);
  }

}

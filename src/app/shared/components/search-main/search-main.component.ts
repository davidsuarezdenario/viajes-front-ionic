import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { addIcons } from 'ionicons';
import { search } from "ionicons/icons";
import { GlbService } from "../../services/glb/glb.service";
import { ApiService } from "../../services/api/api.service";

@Component({
  selector: 'app-search-main',
  templateUrl: './search-main.component.html',
  styleUrls: ['./search-main.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SearchMainComponent implements OnInit {

  searchBussy: boolean = false;

  constructor(
    public glbService: GlbService,
    private apiService: ApiService
  ) {
    addIcons({ search });
  }

  ngOnInit() { }

  firstSearch() {
    console.log('firstSearch: ', this.glbService.searchTo);
    /* manejo de control de formulario */
    if (this.searchBussy) return;
    if (this.glbService.searchTo.length < 3) { this.glbService.airports = []; return; }
    this.searchApi(this.glbService.searchTo);
  }

  async searchApi(searchTo: string) {
    console.log('searchApi: ', searchTo);
    this.searchBussy = true;
    const body = {
      search: searchTo,
    };
    try {
      const response: any = await this.apiService.post('/travel/search_airport', body);
      console.log('searchApi response: ', response);
      if (!response.error) this.handleResponse(response.data);
    } catch (error) {
      console.error('searchApi error: ', error);
    } finally {
      this.searchBussy = false;
      if (searchTo != this.glbService.searchTo) this.firstSearch();
    }
  }

  handleResponse(data: any) {
    console.log('handleResponse data: ', data);
    this.glbService.airports = data.locations;
    console.log('handleResponse airports: ', this.glbService.airports);
  }

}

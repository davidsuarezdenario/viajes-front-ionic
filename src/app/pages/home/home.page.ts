import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { SearchMainComponent } from "../../shared/components/search-main/search-main.component";
import { ApiService } from "../../shared/services/api/api.service";
import { GlbService } from "../../shared/services/glb/glb.service";
import { AlertMainComponent } from "../../shared/components/alert-main/alert-main.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, HeaderMainComponent, SearchMainComponent, AlertMainComponent],
})
export class HomePage implements OnInit {

  mainBanner1: string = "¡Viaja ahora";
  mainBanner2: string = "paga después!";
  lettersBanner1: string[] = [];
  lettersBanner2: string[] = [];

  @ViewChild(AlertMainComponent) alertMainComponent!: AlertMainComponent;

  constructor(
    private apiService: ApiService,
    public glbService: GlbService
  ) {
    this.lettersBanner1 = this.mainBanner1.split("");
    this.lettersBanner2 = this.mainBanner2.split("");
  }

  ngOnInit() {
    this.getDatosInit();
  }

  async getDatosInit() {
    try {
      if (await this.apiService.verifySesion()) {
        const res: any = await this.apiService.post('/users/init-data', { idCliente: this.glbService.idCliente });
        if (!res.Error) {
          if (res.Data){
            this.glbService.userData = res.Data;
            console.log('userData: ', this.glbService.userData);
            this.processDataInit(this.glbService.userData);
            return;
          }else{
            this.alertMainComponent.setOpen(true, 'Error', 'Error al obtener los datos iniciales', 'No se encontraron datos');
          }
        }
        this.alertMainComponent.setOpen(true, 'Error', 'Error al obtener los datos iniciales', res.Message);
      }
    } catch (error: any) {
      console.error('Error al obtener los datos iniciales: ', error);
      this.alertMainComponent.setOpen(true, 'Error', 'Error al obtener los datos iniciales', error?.Message);
    }
  }

  processDataInit(data: any) {
    if (data.Nombres) {
      const nombres = data.Nombres.trim().split(' ');
      data.primerNombre = nombres[0];
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";
import { GlbService } from "../../shared/services/glb/glb.service";
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-booking-two',
  templateUrl: './booking-two.page.html',
  styleUrls: ['./booking-two.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonicModule, CommonModule, HeaderMainComponent]
})
export class BookingTwoPage implements OnInit {
  form: FormGroup;
  formPax: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public glbService: GlbService
  ) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.glbService.passengersData.length == 0 ? this.router.navigate(['/']) : false;
    console.log('glbService passengers', this.glbService.passengersData);
    console.log('glbService flight', this.glbService.flightSelected);
    for(let i=0; i<this.glbService.flightSelected.pax.length; i++){
      for(let j=0; j<this.glbService.flightSelected.pax[i].paxReference[0].traveller.length; j++){
        this.formPax[`nit-${i}-${j}`] = '';
        this.form.addControl(`nit-${i}-${j}`, this.formBuilder.control('', Validators.required));
        this.formPax[`type-${i}-${j}`] = this.glbService.flightSelected.pax[i].paxReference[0].ptc[0];
        this.formPax[`id-${i}-${j}`] = this.glbService.flightSelected.pax[i].paxReference[0].traveller[j].ref[0];
        /* this.formPax.push({
          index: i + '-' + j,
          type: this.glbService.flightSelected.pax[i].paxReference[0].ptc[0],
          id: this.glbService.flightSelected.pax[i].paxReference[0].traveller[j].ref[0]
        }); */
      }
    }
  }

  ionViewWillEnter() {

  }

  buildForm() {}

  addField(fieldName: string, validators: any[] = []) {
    this.form.addControl(fieldName, this.formBuilder.control('', validators));
  }

  onSubmit(): void {
    // Aquí va tu lógica al enviar el formulario
    if (this.form.valid) {
      console.log('Formulario enviado', this.form.value);
      // Aquí puedes incluir más lógica, como llamar a un servicio para enviar los datos del formulario
    } else {
      console.log('Formulario no es válido');
      // Aquí puedes manejar la lógica para un formulario inválido, como mostrar mensajes de error
    }
  }
}

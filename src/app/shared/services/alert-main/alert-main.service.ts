import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertMainService {

  constructor(
    private alertController: AlertController
  ) { }

  async present(header: string='', subHeader: string='', message: string='', buttons: string[]=['Ok']) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
      mode: 'ios'
    });

    await alert.present();
  }
}

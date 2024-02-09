import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { MenuMainComponent } from "./shared/components/menu-main/menu-main.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, MenuMainComponent],
})
export class AppComponent {
  constructor() {}
}

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { HttpClientModule } from "@angular/common/http";
import { TitleCasePipe } from "@angular/common";

import { PopoverController } from '@ionic/angular';

if (environment.production) {
  enableProdMode();
  window.console.log = () => { };
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TitleCasePipe,
    provideIonicAngular(),
    provideRouter(routes),
    PopoverController
  ],
});

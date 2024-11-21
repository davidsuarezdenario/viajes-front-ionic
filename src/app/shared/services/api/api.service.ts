import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from "../../../../environments/environment.prod";
import { GlbService } from '../glb/glb.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  jwt: string = "";

  constructor(
    private http: HttpClient,
    private glbService: GlbService
  ) { }

  createHeaders() {
    return new HttpHeaders()
      .set('x-api-key', environment.api.apiKey)
      .set('Authorization', this.jwt);
  }

  async verifySesion(): Promise<boolean> {
    const session = localStorage.getItem('wanderlustpay-sesion');
    console.log('session: ', session);
    if (!session) return false;
    const { jwt, idCliente } = JSON.parse(session);
    this.jwt = jwt;
    try {
      const res: any = await this.get('/auth/sesion');
      if (!res.Error) {
        this.glbService.idCliente = idCliente;
        this.glbService.sesion = true;
        return true;
      }
    } catch (err: any) {
      console.log('error verificación de sesión: ', err);
      localStorage.removeItem('wanderlustpay-sesion');
      /* if (err.status === 403) {
        localStorage.removeItem('wanderlustpay-sesion');
      } */
    }
    return false;
  }

  async get(url: string) {
    const headers = this.createHeaders();
    const observable = this.http.get(`${environment.api.url}${url}`, { headers: headers });
    return lastValueFrom(observable);
  }

  async post(url: string, data: any) {
    const headers = this.createHeaders();
    const observable = this.http.post(`${environment.api.url}${url}`, data, { headers: headers });
    console.log('url: ', `${environment.api.url}${url}`);
    console.log('headers: ', headers);
    console.log('data: ', data);
    return lastValueFrom(observable);
  }

}
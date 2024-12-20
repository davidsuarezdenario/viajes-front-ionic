import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { GlbService } from '../../shared/services/glb/glb.service';
import { AlertMainService } from "../../shared/services/alert-main/alert-main.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonIcon, CommonModule, RouterLink, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginFormErrors: any = { email: ' ', password: ' ' };
  enSpinner = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private glbService: GlbService,
    private alertMain: AlertMainService
  ) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('login');
      this.loginApi(this.loginForm.value);
    } else {
      this.handleLoginErrors();
    }
  }

  async loginApi(values: any) {
    console.log('loginApi: ', values);
    const body = { username: values.email, password: values.password };
    this.enSpinner = true;
    try {
      const response: any = await this.apiService.post('/auth/login', body);
      console.log('loginApi response: ', response);
      this.handleResponse(response);
    } catch (error: any) {
      this.handleError(error);
    } finally {
      this.enSpinner = false;
    }
  }

  handleResponse(response: any) {
    if (response.Error) {
      console.log('Error: ', response.Error);
      this.alertMain.present('Error', 'Al iniciar sesión', response.Error);
    } else {
      this.processSuccessfulLogin(response);
    }
  }

  processSuccessfulLogin(response: any) {
    this.apiService.jwt = response.Token;
    this.glbService.idCliente = response.Documento;
    this.glbService.sesion = true;
    const toLocalStorage = { jwt: response.Token, idCliente: response.Documento };
    localStorage.setItem('wanderlustpay-sesion', JSON.stringify(toLocalStorage));
    this.loginForm.reset();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  handleError(error: any) {
    console.log('loginApi error: ', error);
    this.alertMain.present('Error', 'Al iniciar sesión', error?.error?.Message);
  }

  handleLoginErrors() {
    this.loginForm.markAllAsTouched();
    const errorMessages: any = {
      email: { required: 'El correo es requerido.', email: 'Por favor, introduce un correo electrónico válido.' },
      password: { required: 'La contraseña es requerida.', minlength: 'La contraseña debe tener al menos 8 caracteres.' }
    };

    Object.keys(this.loginForm.controls).forEach((field) => {
      const controlErrors = this.loginForm.get(field)?.errors;
      if (controlErrors) {
        this.loginFormErrors[field] = '';
        Object.keys(controlErrors).forEach((keyError) => {
          this.loginFormErrors[field] += errorMessages[field][keyError] + ' ';
        });
      }
    });
  }

  getLocalDenario() {
    const storedData = localStorage.getItem('LoginAppMovDenario');
    console.log('Datos almacenados: ', storedData);
    // Verificar si hay datos almacenados
    if (storedData) {
      // Parsear los datos JSON
      const sessionData = JSON.parse(storedData);

      // Acceder a los valores
      const jwt = sessionData.jwt;
      const idCliente = sessionData.idCliente;

      console.log('JWT:', jwt);
      console.log('ID Cliente:', idCliente);
    } else {
      console.log('No hay datos de sesión almacenados.');
    }
    
  }
}
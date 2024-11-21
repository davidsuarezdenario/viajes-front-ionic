import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonSpinner, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { GlbService } from '../../shared/services/glb/glb.service';
import { AlertMainService } from '../../shared/services/alert-main/alert-main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonSpinner, CommonModule, RouterLink, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  signinForm: FormGroup = new FormGroup({});
  signinFormErrors: any = { document: ' ', name: ' ', lastname: ' ', email: ' ', phone: ' ', pass1: ' ', pass2: ' ' };
  enSpinner = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertMain: AlertMainService,
    private glbService: GlbService
  ) { }

  ngOnInit() {
    this.initReactiveForm();
  }

  initReactiveForm() {
    this.signinForm = this.formBuilder.group({
      document: ['', [Validators.required, Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(3000000000), Validators.max(3999999999)]],
      pass1: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register() {
    if (this.signinForm.valid) {
      if (this.signinForm.value.pass1 == this.signinForm.value.pass2) {
        console.log('login: ', this.signinForm.value);
        this.signApi(this.signinForm.value);
      } else {
        this.alertMain.present('Ups', 'Las constraseñas no coinciden', 'Intenta de nuevo');
      }
    } else {
      this.handleLoginErrors();
    }
  }

  async signApi(values: any) {
    console.log('signApi: ', values);
    const body = { username: values.email, password: values.password };
    this.enSpinner = true;
    try {
      const response: any = await this.apiService.post('/auth/register', values);
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
    this.signinForm.reset();
    this.router.navigate(['/home']);
    window.location.reload();
  }

  handleError(error: any) {
    console.log('loginApi error: ', error);
    this.alertMain.present('Error', 'Al iniciar sesión', error?.error?.Message);
  }

  handleLoginErrors() {
    this.signinForm.markAllAsTouched();
    const errorMessages: any = {
      document: { required: 'El documento es requerido.', maxlength: 'El documento debe tener máximo 20 caracteres' },
      name: { required: 'El nombre es requerido.', maxlength: 'El nombre debe tener máximo 30 caracteres' },
      lastname: { required: 'El apellido es requerido.', maxlength: 'El apellido debe tener máximo 30 caracteres' },
      email: { required: 'El correo es requerido.', email: 'Por favor, introduce un correo electrónico válido.' },
      phone: { required: 'El teléfono es requerido.', min: 'El teléfono debe tener 10 dígitos.', max: 'El teléfono debe tener 10 dígitos.' },
      pass1: { required: 'La contraseña es requerida.', minlength: 'La contraseña debe tener mínimo 8 caracteres.' },
      pass2: { required: 'La confirmación de la contraseña es requerida.', minlength: 'La confirmación de la contraseña debe tener mínimo 8 caracteres.' }
    };

    Object.keys(this.signinForm.controls).forEach((field) => {
      const controlErrors = this.signinForm.get(field)?.errors;
      if (controlErrors) {
        this.signinFormErrors[field] = '';
        Object.keys(controlErrors).forEach((keyError) => {
          this.signinFormErrors[field] += errorMessages[field][keyError] + ' ';
        });
      }
    });
  }
}

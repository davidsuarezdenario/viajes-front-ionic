import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, } from '@angular/forms';
import { IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { GlbService } from '../../shared/services/glb/glb.service';
import { AlertMainService } from "../../shared/services/alert-main/alert-main.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonHeader, IonToolbar, IonContent, IonGrid, IonRow, IonCol, IonCard, IonText, IonButtons, IonButton, IonBackButton, IonItem, IonCardHeader, IonCardContent, IonCardTitle, IonInput, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  signinForm: FormGroup = new FormGroup({});
  signinFormErrors: any = { name: ' ', email: ' ', phone: ' ', pass1: ' ', pass2: ' ' };

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
    this.signinForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.min(3000000000), Validators.max(3999999999)]],
      pass1: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

}

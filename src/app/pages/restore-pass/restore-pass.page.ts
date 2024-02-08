import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restore-pass',
  templateUrl: './restore-pass.page.html',
  styleUrls: ['./restore-pass.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RestorePassPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

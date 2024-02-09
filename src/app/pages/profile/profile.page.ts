import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GlbService } from "../../shared/services/glb/glb.service";
import { HeaderMainComponent } from "../../shared/components/header-main/header-main.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderMainComponent]
})
export class ProfilePage implements OnInit {

  constructor(
    public glbService: GlbService
  ) { }

  ngOnInit() {
  }

}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header";
import { FooterComponent } from "../footer/footer";
import { MatIcon } from "@angular/material/icon";


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatSelectModule, RouterModule, CommonModule, HeaderComponent, FooterComponent, MatIcon],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUsComponent {

}

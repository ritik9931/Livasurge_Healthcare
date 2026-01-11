import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
    currentYear = new Date().getFullYear();

  address = 'Livasurge Healthcare, Hyderabad, Telangana, India';
  phone = '+919625743882';
  email = 'dipanshukansal5911@gmail.com';
}

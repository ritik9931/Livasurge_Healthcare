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
import { FooterComponent } from "../footer/footer";
import { HeaderComponent } from "../header/header";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatSelectModule, RouterModule, CommonModule, FooterComponent, HeaderComponent,
    ReactiveFormsModule, MatIcon],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class AppointmentComponent {

  appointmentForm!: FormGroup;
  successModal = false;

  departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'General Medicine',
    'Emergency'
  ];

  constructor(private fb: FormBuilder) {
    this.appointmentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      email: ['', [Validators.email]],
      department: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      message: ['']
    });
  }

  submitAppointment() {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      return;
    }

    console.log('Appointment Data:', this.appointmentForm.value);

    // 🔗 API integration will go here

    // ✅ Simulate API success
    setTimeout(() => {
      this.successModal = true;
      this.appointmentForm.reset();
    }, 600);
  }

  closeSuccess() {
    this.successModal = false;
  }
}



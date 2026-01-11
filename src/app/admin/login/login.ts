import { Component, NgZone  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, RouterModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule,
     MatFormFieldModule, MatIconModule, MatCheckboxModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})

export class Login {

  loginForm!: FormGroup;
  hidePassword = true;
  loginError = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly ngZone: NgZone
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = {
      userId: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.http.post<any>('http://localhost:8080/api/login', payload)
  .subscribe({
    next: (res) => {
      if (res?.success) {
        // 1. Set the item
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        
        // 2. Use a micro-task delay (setTimeout 0) to let the browser cycle
       Promise.resolve().then(() => {
    this.router.navigate(['/admin/dashboard']).then(success => {
       if(!success) console.log("Still failing...");
    });
  });
      }
    }
  });
  }
}




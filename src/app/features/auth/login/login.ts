import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginError = false;

  errorMessage = '';

  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.fb.group({

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]

  });

  onLogin() {

    if (this.loginForm.invalid) {

      return;

    }

    const email =
      this.loginForm.value.email!;

    const password =
      this.loginForm.value.password!;

    const success =
      this.authService.login(
        email,
        password
      );

    if (success) {

      this.loginError = false;

      this.router.navigate(['/dashboard']);

    }

    else {

      this.loginError = true;

      this.errorMessage =
        'Invalid email or password';

    }

  }

}
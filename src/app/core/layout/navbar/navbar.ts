import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {

  router = inject(Router);

  authService = inject(AuthService);

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);
  }

}
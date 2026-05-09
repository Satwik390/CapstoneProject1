import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal(false);

  login(email: string, password: string): boolean {

    if (!email.trim() || !password.trim()) {
      return false;
    }

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    );

    const existingUser = users.find(
      (u: any) => u.email === email
    );

    // Existing user
    if (existingUser) {

      if (existingUser.password === password) {

        localStorage.setItem('isLoggedIn', 'true');

        localStorage.setItem('userEmail', email);

        this.isLoggedIn.set(true);

        return true;
      }

      return false;
    }

    // New user registration
    users.push({
      email,
      password
    });

    localStorage.setItem(
      'users',
      JSON.stringify(users)
    );

    localStorage.setItem('isLoggedIn', 'true');

    localStorage.setItem('userEmail', email);

    this.isLoggedIn.set(true);

    return true;
  }

  logout() {

    localStorage.removeItem('isLoggedIn');

    localStorage.removeItem('userEmail');

    this.isLoggedIn.set(false);
  }

  checkAuth(): boolean {

    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
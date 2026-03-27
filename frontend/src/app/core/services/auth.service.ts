import { Injectable, signal, inject, PLATFORM_ID, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private platformId = inject(PLATFORM_ID);
  private injector = inject(Injector);

  isAuthenticated = signal<boolean>(this.hasToken())

  login(email: string, password: string): boolean{
    if (email === 'admin@banco.com' && password === '123456') {
      const fakeJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.falso-payload.falsa-assinatura';
      localStorage.setItem('token', fakeJwt);
      this.isAuthenticated.set(true);
      this.injector.get(Router).navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.injector.get(Router).navigate(['/login']);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}

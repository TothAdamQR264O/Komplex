import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'accessToken';
  private TOKEN_Role = 'role';
  private TOKEN_FULLNAME = 'name';

  loggedInEvent = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setRole(role: string){
    localStorage.setItem(this.TOKEN_Role, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.TOKEN_Role);
  }

  isUser(role: string): boolean {
    const currentRole = this.getRole();

    return currentRole == role;
  }

  setName(name: string){
    localStorage.setItem(this.TOKEN_FULLNAME, name);
  }

  getName(): string | null {
    return localStorage.getItem(this.TOKEN_FULLNAME);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  preventGuestAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {
        this.router.navigateByUrl('/');
    }

    return isLoggedIn;
}
}

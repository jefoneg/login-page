import { Injectable } from '@angular/core';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usersUrl = './assets/users.json';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser().username;
  }
}

import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isLoggedIn = false;

  private readonly VALID_EMAIL = 'thefoodieleonne@gmail.com';
  private readonly VALID_PASSWORD = 'Leonne!22';

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    // Subscribe to auth state changes
    authState(this.auth).pipe(
      tap(user => {
        const loggedIn = !!user;
        this.isLoggedInSubject.next(loggedIn);
        this.isLoggedIn = loggedIn;
      })
    ).subscribe();
  }

  async login(email: string, password: string): Promise<void> {
    if (email === this.VALID_EMAIL && password === this.VALID_PASSWORD) {
      try {
        await signInWithEmailAndPassword(this.auth, email, password);
      } catch (error) {
        // If Firebase account doesn't exist yet, create it
        throw new Error('Invalid credentials. Please try again.');
      }
    } else {
      throw new Error('Invalid credentials. Please try again.');
    }
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/admin/login']);
    });
  }

  isAuthenticated(): Observable<boolean> {
    return authState(this.auth).pipe(
      map(user => !!user)
    );
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth);
  }
}

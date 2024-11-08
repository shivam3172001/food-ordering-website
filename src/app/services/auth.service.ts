import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Sign-in method
  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error("Login error: ", error);
    }
  }

  // Sign-up method with display name update
  signUp(email: string, password: string, displayName: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
          if (userCredential.user) {
            // Set the display name for the new user
            await userCredential.user.updateProfile({ displayName });
            console.log("Display name set to:", displayName);
          }
          observer.next(userCredential);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error.message);
        });
    });
  }

  // Sign-out method
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }
}

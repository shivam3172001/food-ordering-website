import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';  // Added errorMessage property

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    // Clear previous error message
    this.errorMessage = '';

    // Call sign-up method from AuthService
    this.authService.signUp(this.email, this.password, this.name).subscribe({
      next: (userCredential) => {
        console.log('Signup successful:', userCredential);
        this.router.navigate(['/dashboard']); // Navigate to the dashboard or desired page
      },
      error: (errorMessage) => {
        // Show error message if signup fails
        this.errorMessage = 'Signup error: ' + errorMessage;
        console.error('Signup error:', errorMessage);
      }
    });
  }
}

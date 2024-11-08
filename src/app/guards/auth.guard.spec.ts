import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';  // For router-related tests
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';  // If your guard uses Router
//import { provideMockStore } from '@ngrx/store/testing';  // If you're using NgRx for state management

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  // This will mock router functionality
      providers: [
        AuthGuard,  // Provide AuthGuard as a service
        // Optionally, provide other services or dependencies here
      ]
    });
    guard = TestBed.inject(AuthGuard);  // Use TestBed to inject the guard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  // You can add more tests here to check the guard logic, e.g., whether it allows or denies access based on conditions
});

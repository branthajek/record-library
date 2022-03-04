import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @ViewChild('authForm', {static: true}) authForm!: NgForm;
  isLoginMode = true;
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  } 

  onSubmit() {
    if (!this.authForm.value) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      {
        next: (responseData) => {
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      }
    );

    this.authForm.reset();
  }
 
}

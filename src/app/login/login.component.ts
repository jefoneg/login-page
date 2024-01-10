import { Component, OnInit } from '@angular/core';
import { IUser } from '../iuser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  credentials: IUser = { email: '', password: '' };
  notification: string = '';
  isAuthenticated: boolean | null = null;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.credentials.email = this.loginForm.get('email')?.value;
    this.credentials.password = this.loginForm.get('password')?.value;
    this.loginService.login(this.credentials.email, this.credentials.password).subscribe((loggedIn) => {
      if(loggedIn) {
        this.notification = "Logged in Successfully";
        this.isAuthenticated = true;
      }
      else {
        this.notification = "Log in failed.";
        this.isAuthenticated = false;
      }
    })
  }
}

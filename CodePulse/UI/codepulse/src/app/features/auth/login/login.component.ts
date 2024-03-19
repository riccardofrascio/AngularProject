import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model:LoginRequest;

  constructor() {

    this.model = {
      email: '',
      password: ''
    } 
  }

  onFormSubmit(): void {
    console.log(this.model);
  }

}

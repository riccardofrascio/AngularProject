import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatSlideToggleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model:LoginRequest;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {

    this.model = {
      email: '',
      password: ''
    } 
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => { //email, token, roles
        //console.log(response);
        this.cookieService.set('Authorization', `Bearer ${response.token}`, undefined, '/', undefined, true, 'Strict');
        
        this.authService.setUser({email: response.email, roles: response.roles});
        this.router.navigateByUrl('/');
      }
    });
  }

}

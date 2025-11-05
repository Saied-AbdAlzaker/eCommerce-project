import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, InputComponent, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  msgError: string = '';
  loading: boolean = false;
  hidePassword: boolean = true;
  loginForm!: FormGroup;
  subscription: Subscription = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  public readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]]
    })
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.loading = true;
      this.subscription = this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message == "success") {
            // this.cookieService.set('token', res.token);
            // this.authService.decodeToken();
            localStorage.setItem('token', res.token);
            this.authService.userInfo();
            this.router.navigate(['/home']);
          }
          this.loading = false;
        }, error: (err) => {
          this.msgError = err.error.message;
          this.loading = false;
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}

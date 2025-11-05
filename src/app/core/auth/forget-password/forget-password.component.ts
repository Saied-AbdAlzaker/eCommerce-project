import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnInit {

  forgotPassword!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  step: number = 1;
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.forgotPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })
    this.verifyCode = this.fb.group({
      resetCode: [null, [Validators.required]]
    })
    this.resetPassword = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]]
    })
  }

  submitFormForget(): void {
    if (this.forgotPassword.valid) {
      this.authService.verifyEmail(this.forgotPassword.value).subscribe({
        next: (res) => {
          this.toastrService.success(res.statusMsg, res.message);
          this.step = 2;
        }
      })
    }
  }

  submitFormCode(): void {
    if (this.verifyCode.valid) {
      this.authService.verifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          this.toastrService.success(res.status);
          this.step = 3;
        }
      })
    }
  }

  submitFormReset(): void {
    if (this.resetPassword.valid) {
      this.authService.resetPassword(this.resetPassword.value).subscribe({
        next: (res) => {
          this.toastrService.success('Success');
          this.cookieService.get('token');
          this.router.navigate(['/home']);
        }
      })
    }
  }

}

import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  msgError: string = '';
  loading: boolean = false;
  hidePassword: boolean = true;
  hideRePassword: boolean = true;
  registerForm!: FormGroup;
  subscription:Subscription = new Subscription();
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]],
      rePassword: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[01245][0-9]{8}$/)]]
    }, { validators: this.confirmPassword })
  }

  confirmPassword(formData: AbstractControl) {
    // return formData.get('password')?.value === formData.get('rePassword')?.value ? null : { mismatch: true };
    if (formData.get('password')?.value === formData.get('rePassword')?.value) {
      return null;
    } else {
      formData.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.subscription.unsubscribe();
      this.loading = true;
      this.subscription = this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === "success") {
            this.router.navigate(['/login']);
          }
          this.loading = false;
        }, error: (err) => {
          this.msgError = err.error.message;
          this.loading = false;
        }
      })
    } else {
      this.registerForm.setErrors({ 'mismatch': true });
      this.registerForm.markAllAsTouched();
    }
  }

}

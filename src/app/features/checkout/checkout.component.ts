import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/servise/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkoutForm!: FormGroup;
  id: string | null = null;
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        console.log(this.id);

      }
    })
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[01245][0-9]{8}$/)]],
        city: [null, [Validators.required]],
      })
    })
  }

  submitForm(): void {
    if (this.checkoutForm.valid) {
      this.cartService.checkOutSeesion(this.id, this.checkoutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            window.open(res.session.url, '_self');
          }

        }, error: (err) => {
          console.log(err);

        }
      })
    }
  }

}

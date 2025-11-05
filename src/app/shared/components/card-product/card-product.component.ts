import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../core/models/products';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../pipes/term.pipe';
import { CartService } from '../../../features/cart/servise/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-product',
  imports: [RouterLink, TermPipe],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {

  @Input({ required: true }) product: Product = {} as Product;

  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
        this.toastr.success(res.message, 'Success');
      }
    })
  }

}

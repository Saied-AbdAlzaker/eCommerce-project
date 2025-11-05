import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './servise/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { Cart } from './model/cart';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartList: Cart = {} as Cart;

  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  ngOnInit(): void {
    this.getLoggedUserData();
  }

  getLoggedUserData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartList = res.data;
      }
    })
  }

  updateCartItem(id: string, count: number): void {
    this.cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartList = res.data;
      }
    })
  }

  removeCartItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartList = res.data;
        // this.cartService.coutNumber.next(res.numOfCartItems);
        this.cartService.cartNumber.set(res.numOfCartItems);
        this.toastr.success(res.messge, 'Product deleted successfully from your cart');
      }
    })
  }
  clearCart(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.getLoggedUserData();
        this.cartService.cartNumber.set(res.numOfCartItems);
        this.toastr.success(res.messge, 'Clear cart successfully');
      }
    })
  }

}

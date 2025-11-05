import { Component, OnInit } from '@angular/core';
import { CartItem, IOrders } from './model/orders';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrdersService } from './services/orders.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{

  allOrders: IOrders[] = [];
  userId: string = '';
  cartItem: CartItem[] = [];
  show: boolean = false;

  constructor(private ordersService: OrdersService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.user().id;
    this.getUserProducts(this.userId)
  }

  getUserProducts(id: string) {
    this.ordersService.getUserOrders(id).subscribe({
      next: (res) => {
        this.allOrders = res;
      }
    })
  }

  openModel(index: number) {
    this.cartItem = this.allOrders[index].cartItems;
    console.log(this.cartItem);
    this.show = true;
  }



}

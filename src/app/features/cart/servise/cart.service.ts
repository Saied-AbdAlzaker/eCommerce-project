import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { IShippingAddress } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  // myHeaders: object = {
  //   headers: { token: this.cookieService.get('token') }
  // }

  // coutNumber:BehaviorSubject<number> = new BehaviorSubject(0);
  cartNumber:WritableSignal<number> = signal(0);

  addProductToCart(prodId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}cart`,
      { productId: prodId }
    )
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}cart`
    )
  }

  updateCartQuantity(prodId: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}cart/${prodId}`,
      { count: count }
    )
  }

  removeSpecificCartItem(prodId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart/${prodId}`
    )
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart`
    )
  }

  checkOutSeesion(id: string | null, payload: IShippingAddress): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}orders/checkout-session/${id}?url=http://localhost:4200`, payload)
  }

}

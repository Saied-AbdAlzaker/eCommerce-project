import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly httpClient = inject(HttpClient);

  getAllOrders(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}orders`)
  }

  getUserOrders(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}orders/user/${id}`)
  }
}

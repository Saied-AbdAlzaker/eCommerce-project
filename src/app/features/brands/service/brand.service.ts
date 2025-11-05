import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ResponseBrands, ResponseSpecificBrand } from '../model/brands';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private readonly httpClient = inject(HttpClient);

  allBrands(): Observable<ResponseBrands> {
    return this.httpClient.get<ResponseBrands>(`${environment.baseUrl}brands`);
  }

  getSpecificBrand(id: string): Observable<ResponseSpecificBrand> {
    return this.httpClient.get<ResponseSpecificBrand>(`${environment.baseUrl}brands/${id}`);
  }

}

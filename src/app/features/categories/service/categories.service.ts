import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCategory, ResponseSpecificCategory } from '../model/category';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly httpClient = inject(HttpClient);

  allCategories(): Observable<ResponseCategory> {
    return this.httpClient.get<ResponseCategory>(`${environment.baseUrl}Categories`);
  }

  getSpecificCategory(id: string): Observable<ResponseSpecificCategory> {
    return this.httpClient.get<ResponseSpecificCategory>(`${environment.baseUrl}Categories/${id}`);
  }
}

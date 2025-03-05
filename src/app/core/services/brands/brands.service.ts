import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1/brands';

  constructor(private httpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }

  getSpecificBrand(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
}

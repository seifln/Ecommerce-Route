import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //api logic -->inject HttpClient 
  constructor(private httpClient:HttpClient) {}
  
  getAllProducts():Observable<any>{
      return  this.httpClient.get(`${environment.baseUrl}/api/v1/products`)
  }

  getSpecificProducts(id:string):Observable<any>{
    return  this.httpClient.get(`${environment.baseUrl}/api/v1/products/${id}`)
  }
}

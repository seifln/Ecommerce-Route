import { HttpClient, HttpHeaders } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private myToken: string = '';

  constructor(private httpClient: HttpClient) { 
    this.updateToken();
  }

  private updateToken(): void {
    if (typeof window !== 'undefined') {
      this.myToken = localStorage.getItem('token') || '';
    }
  }

  // Get updated headers with token
  private getHeaders(): HttpHeaders {
    this.updateToken(); // Update token before each request
    return new HttpHeaders({
      token: this.myToken
    });
  }

  cartNumber:WritableSignal<number> = signal(0)

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { productId: id },
      { headers: this.getHeaders() }
    );
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { headers: this.getHeaders() }
    );
  }

  removeSpecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { headers: this.getHeaders() }
    );
  }

  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this.httpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count: newCount },
      { headers: this.getHeaders() }
    );
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(
      'https://ecommerce.routemisr.com/api/v1/cart',
      { headers: this.getHeaders() }
    );
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private myToken: string = '';
  wishlistNumber: WritableSignal<number> = signal(0);
  private wishlistItems: Set<string> = new Set();

  constructor(private httpClient: HttpClient) { 
    this.updateToken();
    this.getLoggedUserWishlist().subscribe({
      next: (res) => {
        res.data.forEach((item: any) => this.wishlistItems.add(item.id));
        this.wishlistNumber.set(this.wishlistItems.size);
      }
    });
  }

  private updateToken(): void {
    if (typeof window !== 'undefined') {
      this.myToken = localStorage.getItem('token') || '';
    }
  }

  private getHeaders(): HttpHeaders {
    this.updateToken();
    return new HttpHeaders({
      token: this.myToken
    });
  }

  addToWishlist(productId: string): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      { productId },
      { headers: this.getHeaders() }
    );
  }

  removeFromWishlist(productId: string): Observable<any> {
    return this.httpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: this.getHeaders() }
    );
  }

  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/wishlist',
      { headers: this.getHeaders() }
    );
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistItems.has(productId);
  }

  toggleWishlistItem(productId: string): void {
    if (this.wishlistItems.has(productId)) {
      this.wishlistItems.delete(productId);
      this.removeFromWishlist(productId).subscribe();
    } else {
      this.wishlistItems.add(productId);
      this.addToWishlist(productId).subscribe();
    }
    this.wishlistNumber.set(this.wishlistItems.size);
  }
}

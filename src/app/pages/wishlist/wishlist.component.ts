import { Component, OnInit, inject, signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  wishlistProducts = signal<any[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.getWishlistProducts();
  }

  getWishlistProducts(): void {
    this.isLoading.set(true);
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
      }
    });
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.toggleWishlistItem(productId);
    this.wishlistProducts.update(products => products.filter(product => product.id !== productId));
    this.toastrService.success('Product removed from wishlist', 'FreshCart');
  }

  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

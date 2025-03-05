import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ✅ Import Router for navigation
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly router = inject(Router); // ✅ Inject Router for navigation
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productId: any;
  productDetails: IProduct = {} as IProduct;
  loading = true; // ✅ Add loading state

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.productId = res.get("id");

        if (!this.productId) {
          this.router.navigate(['/']); // ✅ Redirect if no product ID
          return;
        }

        this.productsService.getSpecificProducts(this.productId).subscribe({
          next: (res) => {
            this.productDetails = res.data;
            this.loading = false; // ✅ Stop loading when data arrives
          },
          error: (err) => {
            console.error(err);
            this.router.navigate(['/']); // ✅ Redirect on error
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/']); // ✅ Redirect on error
      }
    });
  }

  addToCart(): void {
    this.cartService.addProductToCart(this.productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart');
          this.cartService.cartNumber.set(res.numOfCartItems);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Failed to add product to cart', 'Error');
      }
    });
  }
}

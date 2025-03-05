import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductsService } from '../../core/services/products/products.service';
import { Router } from '@angular/router';

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './products.component.html',
  styles: []
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }

  navigateToDetails(productId: string) {
    this.router.navigate(['/details', productId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  selectedBrand: any = null;
  loading: boolean = false;

  constructor(private brandsService: BrandsService) {}

  ngOnInit() {
    this.fetchBrands();
  }

  fetchBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (data) => {
        this.brands = data.data;
      },
      error: (err) => console.error('Error fetching brands:', err)
    });
  }

  fetchBrandDetails(id: string) {
    this.loading = true;
    this.brandsService.getSpecificBrand(id).subscribe({
      next: (data) => {
        this.selectedBrand = data.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching brand:', err);
        this.loading = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = null;
  loading: boolean = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  fetchCategoryDetails(id: string) {
    this.loading = true;
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (data) => {
        this.selectedCategory = data.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching category:', err);
        this.loading = false;
      }
    });
  }
}

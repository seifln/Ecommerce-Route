import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../shared/interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
  transform(products: IProduct[], term: string): IProduct[] {
    if (!term) return products;
    
    return products.filter(product => 
      product.title.toLowerCase().includes(term.toLowerCase()) ||
      product.category.name.toLowerCase().includes(term.toLowerCase())
    );
  }
} 
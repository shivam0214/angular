import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './services/product.service'; // Adjust the import path as necessary

@Pipe({
  name: 'productSort'
})
export class ProductSortPipe implements PipeTransform {

  transform(products: Product[], sortBy: string): Product[] {
    if (!products || !sortBy) return products;

    const sortedProducts = [...products];

    switch (sortBy) {
      case 'priceAsc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'nameAsc':
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      case 'nameDesc':
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  }
}

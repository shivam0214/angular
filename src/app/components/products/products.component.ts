import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: false,
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  displayedProducts: Product[] = []; // Products currently displayed
  categories: string[] = [];
  selectedCategory: string = '';
  selectedRating: number = 0;
  sortOption = '';
  loadMoreCount: number = 10; // Number of products to load at a time

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
      this.displayedProducts = this.filteredProducts.slice(0, this.loadMoreCount); // Load initial products

      // Extract unique categories
      this.categories = [...new Set(data.map((product) => product.category))];
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        !this.selectedCategory || product.category === this.selectedCategory;
      const matchesRating = product.rating >= this.selectedRating;
      return matchesCategory && matchesRating;
    });

    // Reset displayed products after filtering
    this.displayedProducts = this.filteredProducts.slice(0, this.loadMoreCount);
  }

  loadMoreProducts(): void {
    const currentLength = this.displayedProducts.length;
    const nextProducts = this.filteredProducts.slice(
      currentLength,
      currentLength + this.loadMoreCount
    );
    this.displayedProducts = [...this.displayedProducts, ...nextProducts];
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.thumbnail
    });
    this.toastr.success(`${product.title} has been added to the cart!`, 'Success'); // Toastr notification
  }

  getCategoryImage(category: string): string {
    const categoryImages: { [key: string]: string } = {
      Electronics: 'path/to/electronics.jpg',
      Clothing: 'path/to/clothing.jpg',
      'Home Appliances': 'path/to/home-appliances.jpg',
      Books: 'path/to/books.jpg',
    };
    return categoryImages[category] || 'path/to/default.jpg';
  }

  filterByCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    this.filterProducts();
  }

  getProductCountForCategory(category: string): number {
    return this.products.filter(product => product.category === category).length;
  }
}

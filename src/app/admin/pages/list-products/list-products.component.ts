import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  standalone: false
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  editProduct(product: Product): void {
    console.log('Editing product:', product);
    this.router.navigate(['/admin/edit-product', product._id]); // Navigate to EditProductComponent
  }

  deleteProduct(product: any): void {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts(); // Reload products after deletion
    });
  }
}

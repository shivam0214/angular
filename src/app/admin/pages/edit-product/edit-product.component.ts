import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, Product } from '../../../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  standalone: false
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.productId)

    this.productService.getProducts().subscribe((products) => {
      const product = products.find((p) => p.id === this.productId);
      if (product) {
        this.initializeForm(product);
      }
    });
  }

  initializeForm(product: Product): void {
    this.editProductForm = this.fb.group({
      title: [product.title, Validators.required],
      description: [product.description, Validators.required],
      category: [product.category, Validators.required],
      price: [product.price, [Validators.required, Validators.min(0)]],
      stock: [product.stock, [Validators.required, Validators.min(0)]],
      thumbnail: [product.thumbnail]
    });
  }

  saveProduct(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = { ...this.editProductForm.value, id: this.productId };
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigate(['/admin/list-products']); // Navigate back to the product list
      });
    }
  }
}

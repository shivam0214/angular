import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  standalone: false
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  isLoading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      stock: [0, Validators.required],
      tags: [''],
      brand: [''],
      sku: [''],
      weight: [0],
      dimensions: this.fb.group({
        width: [0],
        height: [0],
        depth: [0]
      }),
      warrantyInformation: [''],
      shippingInformation: [''],
      availabilityStatus: [''],
      returnPolicy: [''],
      minimumOrderQuantity: [1],
      images: [[]],
      thumbnail: ['']
    });

    // Get the product ID from the route
    this.productId = this.route.snapshot.paramMap.get('id') || '';

    // Fetch the product details
    if (this.productId) {
      this.productService.getProductByid(this.productId).subscribe(
        (product) => {
          this.populateForm(product);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching product:', error);
          this.toastr.error('Failed to fetch product details.', 'Error');
          this.isLoading = false;
        }
      );
    }
  }

  // Populate the form with product data
  populateForm(product: Product): void {
    this.productForm.patchValue({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      tags: product.tags.join(', '), // Convert array to comma-separated string
      brand: product.brand,
      sku: product.sku,
      weight: product.weight,
      dimensions: product.dimensions,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      images: product.images,
      thumbnail: product.thumbnail
    });
  }

  // Handle image selection
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files).map(file => URL.createObjectURL(file));
      this.productForm.patchValue({ images: files });
    }
  }

  // Handle thumbnail selection
  onThumbnailSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const thumbnail = URL.createObjectURL(input.files[0]);
      this.productForm.patchValue({ thumbnail });
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = {
        ...this.productForm.value,
        tags: this.productForm.value.tags.split(',').map((tag: string) => tag.trim()) // Convert string back to array
      };

      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => {
          this.toastr.success('Product updated successfully!', 'Success');
          this.router.navigate(['/admin/list-products']); // Navigate back to the product list
        },
        (error) => {
          console.error('Error updating product:', error);
          this.toastr.error('Failed to update product.', 'Error');
        }
      );
    } else {
      this.toastr.warning('Please fill out the form correctly.', 'Warning');
    }
  }
}

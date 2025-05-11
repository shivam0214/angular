import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: false
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
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
     // weight: [0],
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
      thumbnail: [''],
      createdBy: "1" // Assuming a default user ID for the creator
    });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files).map(file => URL.createObjectURL(file));
      this.productForm.patchValue({ images: files });
    }
  }

  onThumbnailSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const thumbnail = URL.createObjectURL(input.files[0]);
      this.productForm.patchValue({ thumbnail });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log('Product Data:', this.productForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

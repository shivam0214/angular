import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: false,

})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      thumbnail: ['']
    });
  }

  addProduct(): void {
    if (this.addProductForm.valid) {
      const product = this.addProductForm.value;
      this.productService.addProduct(product).subscribe(() => {
        alert('Product added successfully!');
        this.addProductForm.reset(); // Reset the form after submission
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}

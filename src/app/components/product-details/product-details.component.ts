
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null; // Initialize as null
  isLoading: boolean = true; // Add a loading state
  selectedImage: string | null = null;
  zoomEnabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProducts().subscribe((products) => {
        this.product = products.find((p) => p._id === +productId) || null;
        this.product = products.find((p) => p._id.toString() === productId) || null;

        this.isLoading = false; // Set loading to false after data is fetched
      });
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }
  enableZoom(): void {
    this.zoomEnabled = true;
  }

  disableZoom(): void {
    this.zoomEnabled = false;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart({
      id: product._id,
      name: product.title, // Use 'title' from the Product interface
      price: product.price,
      quantity: 1,
      image: product.thumbnail // Use 'thumbnail' as the image for the cart
    });
    this.toastr.success(`${product.title} has been added to the cart!`, 'Success'); // Toastr notification
  }
}

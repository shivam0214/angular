import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  couponCode: string = '';
  discount: number = 0;
  selectedPaymentMethod: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  decreaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, this.cartItems[index].quantity - 1);
    this.cartItems = this.cartService.getCartItems();
  }

  increaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, this.cartItems[index].quantity + 1);
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  applyCoupon(): void {
    if (this.couponCode === 'DISCOUNT10') {
      this.discount = this.calculateTotal() * 0.1; // 10% discount
    } else {
      this.discount = 0;
      alert('Invalid coupon code');
    }
  }

  checkout(): void {
    if (this.selectedPaymentMethod) {
      alert(`Checkout successful with ${this.selectedPaymentMethod}`);
      // Add further checkout logic here
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart items and update cartCount
    this.cartService.getCartItemsObservable().subscribe(cartItems => {
      this.cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    });
  }
}
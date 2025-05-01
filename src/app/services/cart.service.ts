import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.cartItems);

  constructor() {
    this.loadCartFromLocalStorage(); // Load cart items from local storage on service initialization
  }

  // Get cart items as an observable
  getCartItemsObservable() {
    return this.cartItemsSubject.asObservable();
  }

  // Get all cart items
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Add an item to the cart
  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.saveCartToLocalStorage(); // Save updated cart to local storage
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  // Remove an item from the cart
  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCartToLocalStorage(); // Save updated cart to local storage
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  // Update the quantity of an item
  updateQuantity(index: number, quantity: number): void {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    } else {
      this.removeItem(index);
    }
    this.saveCartToLocalStorage(); // Save updated cart to local storage
    this.cartItemsSubject.next(this.cartItems); // Notify subscribers
  }

  // Calculate the total price of the cart
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Save cart items to local storage
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Load cart items from local storage
  private loadCartFromLocalStorage(): void {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartItemsSubject.next(this.cartItems); // Notify subscribers with the loaded cart
    }
  }

}

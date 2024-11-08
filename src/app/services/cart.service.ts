import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);

  constructor() {}

  // Add food item to the cart
  addToCart(food: Food): void {
    const cartItem = this.cart.items.find((item) => item.food.id === food.id);

    if (cartItem) {
      // If the item already exists, increase quantity
      this.changeQuantity(food.id, cartItem.quantity + 1);
    } else {
      // Otherwise, add the item to the cart
      this.cart.items.push(new CartItem(food));
      this.setCartToLocalStorage();
    }
  }

  // Remove food item from the cart
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id !== foodId);
    this.setCartToLocalStorage();
  }

  // Change the quantity of an item in the cart
  changeQuantity(foodId: string, quantity: number): void {
    if (quantity < 1) return; // Prevent setting quantity to 0 or negative

    const cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  // Clear the cart
  clearCart(): void {
    this.cart = new Cart(); // Reset cart to an empty one
    this.setCartToLocalStorage();
  }

  // Get the list of cart items
  getCartItems(): CartItem[] {
    return this.cart.items;
  }

  // Get the total price of items in the cart
  getTotal(): number {
    return this.cart.totalPrice;
  }

  // Get an observable for cart data
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Save cart data to localStorage
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson); // Persist cart in localStorage
    this.cartSubject.next(this.cart); // Emit the updated cart
  }

  // Retrieve the cart from localStorage
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart(); // Return parsed cart or an empty cart if none exists
  }
}

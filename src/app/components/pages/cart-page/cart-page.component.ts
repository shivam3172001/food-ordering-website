import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CartItem } from '../../../shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;

  constructor(private cartService: CartService) {
    // Subscribing to cart updates
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  ngOnInit(): void {
    // ngOnInit is not required here unless you need to run additional setup code.
  }

  // Remove item from the cart
  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  // Change item quantity in the cart
  changeQuantity(cartItem: CartItem, quantityInString: string): void {
    const quantity = parseInt(quantityInString, 10);

    // Ensure the quantity is a valid positive integer
    if (!isNaN(quantity) && quantity > 0) {
      this.cartService.changeQuantity(cartItem.food.id, quantity);
    } else {
      alert('Please enter a valid quantity.');
    }
  }
}

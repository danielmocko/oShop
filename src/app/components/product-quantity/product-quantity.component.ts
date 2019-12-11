import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Product } from './../admin/admin-products/admin-products.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cardService:ShoppingCartService) { }

  addToCart(){
    this.cardService.addToCart(this.product);
  }
  

  removefromCart(){
    this.cardService.removeFromCart(this.product);
  }
 
}

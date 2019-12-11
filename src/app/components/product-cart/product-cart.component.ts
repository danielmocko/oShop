import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from './../admin/admin-products/admin-products.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent  {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cardService:ShoppingCartService) { 
  }

  getQuantity(){
    if(!this.shoppingCart || !this.shoppingCart.items)
      return 0;

   let item = this.shoppingCart.items[this.product.key];
    return item? item.quantity : 0;   
  }

  addToCart(){
    this.cardService.addToCart(this.product);
  }
  removefromCart(){
    this.cardService.removeFromCart(this.product);
  }
}

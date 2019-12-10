import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from './../admin/admin-products/admin-products.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cardService:ShoppingCartService) { }

  addToCart(product:Product){
    this.cardService.addToCart(product);
  }

  ngOnInit() {
  }

}

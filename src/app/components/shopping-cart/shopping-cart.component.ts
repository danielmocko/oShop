import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;

  constructor(private shoppingCartService:ShoppingCartService) { }

  async ngOnInit() {
    this.cart$= (await this.shoppingCartService.getCart()).snapshotChanges().pipe(map(x=>new ShoppingCart(x.payload.child('items').val())))
  }

  clearCart(){
    this.shoppingCartService.clearCart()
  }

}

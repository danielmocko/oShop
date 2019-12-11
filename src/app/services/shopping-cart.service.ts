

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireObject } from '@angular/fire/database';
import { Product } from './../components/admin/admin-products/admin-products.component';
import { take } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    })
  }

  async clearCart(){
    let cartId= await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  async getCart():Promise<AngularFireObject<ShoppingCart>>{
    let cartId= await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

  async addToCart(product:Product){
    this.updateItemQuantity(product,1);
  }

  async removeFromCart(product:Product){
    this.updateItemQuantity(product,-1);
  }

  private async getOrCreateCartId():Promise<string>{
    let cartId = localStorage.getItem('cartId');
    
    if(!cartId){
      let result=await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
    }

    return cartId;
  }

  private getItem(cartId:string,productId:string){
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
  }

  private async updateItemQuantity(product:Product, change: number){
    let cartId =await this.getOrCreateCartId();
    let item$= this.getItem(cartId,product.key)

    item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
      let items=item.payload.child('quantity').val();
      let quant =(items || 0) + change;
      if(quant===0) item$.remove()
      else
        item$.update({product:product,quantity:quant});
    });
  }
}



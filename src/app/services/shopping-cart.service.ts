import { take } from 'rxjs/operators';
import { Product } from './../components/admin/admin-products/admin-products.component';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

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

  private getCart(cartId:string){
    return this.db.object('/shopping-carts/'+cartId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      let result=await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
    }

    return cartId;
  }

  async addToCart(product:Product){
    console.log(product)
    let cartId =await this.getOrCreateCartId();
    let item$= this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);

     item$.snapshotChanges().pipe(take(1)).subscribe(item=>{
      let items=item.payload.child('quantity').val();
      item$.update({product:product,quantity:(items || 0)+1});
    });
  }
}

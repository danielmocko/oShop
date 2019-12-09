import { Observable } from 'rxjs';
import { Product } from './../components/admin/admin-products/admin-products.component';
import { map, take } from 'rxjs/operators';
import { AppProduct } from './../models/app-product';
import { AngularFireList } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { VirtualTimeScheduler } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }

  getAll():Observable<Product[]> {
    return this.db.list("/products").snapshotChanges().pipe(
      map(products=>products.map(p=>{
       let product =new AppProduct();
       product.key = p.key;
       product.title=p.payload.child('title').val();
       product.imageUrl=p.payload.child('imageUrl').val();
       product.price=p.payload.child('price').val();
       product.category=p.payload.child('category').val();
 
       return product;
      }))) ;
  }

  getProducts(){
    return this.db.list("/products");
  }

  getAllProducts(){
    return this.db.list("/products").snapshotChanges().pipe(
      map(products=>products.map(p=>{
       let product=new AppProduct()
       product.key = p.key;
       product.title=p.payload.child('title').val();
       product.imageUrl=p.payload.child('imageUrl').val();
       product.price=p.payload.child('price').val();
       product.category=p.payload.child('category').val();
 
       return product;
      }))) ;
  }

  getProduct(productId){
    return this.db.object('/products/'+productId);
  } 

  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  } 
  delete(prodictId){
    return this.db.object('/products/'+prodictId).remove();
  }   
  
  getProductsByCategories(category){
    return this.db.list('/products/').query.orderByChild('category').equalTo(category)
    /*
    .on('child_added',function(snapshot){
      let product = new AppProduct()
      product.key=snapshot.key;
      product.category=snapshot.child('category').val();
      product.imageUrl=snapshot.child('imageurl').val();
      product.price=snapshot.child('price').val();
      product.title=snapshot.child('titiel').val();
      console.log(product)
      return product
    });*/
  }

}
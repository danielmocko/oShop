import { ShoppingCartService } from '../../services/shopping-cart.service';
import { AppProduct } from "./../../models/app-product";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "./../../services/product.service";
import { Component, OnInit,OnDestroy } from "@angular/core";
import { Product } from "../admin/admin-products/admin-products.component";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  filterCategories: AppProduct[] = [];
  products: Product[] = [];
  filteredProducts: any;
  category: string;
  shoppingCart;
  subscription:Subscription;
  cartId:any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService:ShoppingCartService
  ) {
    this.productService
      .getProducts()
      .snapshotChanges()
      .subscribe(products => {
        products.map(p => {
          let product = new AppProduct();
          product.key = p.key;
          product.title = p.payload.child("title").val();
          product.imageUrl = p.payload.child("imageUrl").val();
          product.price = p.payload.child("price").val();
          product.category = p.payload.child("category").val();
          this.products.push(product);
        });
      });

    this.route.queryParamMap.subscribe(params => {
      this.category = params.get("category");
      if (this.category) {
        this.filterCategories = [];
        this.productService
          .getProductsByCategories(this.category)
          .on("child_added", snapshot => {
            let product = new AppProduct();
            product.key = snapshot.key;
            product.category = snapshot.child("category").val();
            product.imageUrl = snapshot.child("imageUrl").val();
            product.price = snapshot.child("price").val();
            product.title = snapshot.child("title").val();
            this.filterCategories.push(product);
            console.log(this.filterCategories)
          });
      } else {
        this.filterCategories = this.products;
      }
    });
  }

  ngOnInit() {
  }
  
  

}
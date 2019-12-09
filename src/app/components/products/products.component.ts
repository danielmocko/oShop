import { AppProduct } from "./../../models/app-product";

import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { CategoryService } from "./../../services/category.service";
import { ProductService } from "./../../services/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../admin/admin-products/admin-products.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  filterCategories: AppProduct[] = [];
  products: Product[] = [];
  filteredProducts: any;
  categories$;
  category: string;
  categoryRouter;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
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

    this.categories$ = this.categoryService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(categories =>
          categories.map(a => {
            const key = a.key;
            const name = a.payload.child("name").val();
            return { key, name };
          })
        )
      );

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
            product.title = snapshot.child("titiel").val();
            this.filterCategories.push(product);
          });
      } else {
        this.filterCategories = this.products;
      }
    });
  }

  ngOnInit() {}
}

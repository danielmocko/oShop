import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";
import { CategoryService } from "./../../services/category.service";
import { ProductService } from "./../../services/product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products$;
  categories$;
  category:string

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.products$ = productService.getAll();

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
      
      route.queryParamMap.subscribe(params=>{
        this.category=params.get('category');
      });
  }

  ngOnInit() {}
}

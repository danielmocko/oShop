import { Observable } from "rxjs";
import { AppProduct } from "./../../../models/app-product";
import { ProductService } from "./../../../services/product.service";
import { CategoryService } from "./../../../services/category.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { take } from "rxjs/operators";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = new AppProduct();
  id;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
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

    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    if (this.id) {
      this.productService
        .getProduct(this.id)
        .snapshotChanges()
        .pipe(take(1))
        .subscribe(p => {
          this.product.title = p.payload.child("title").val();
          this.product.imageUrl = p.payload.child("imageUrl").val();
          this.product.price = p.payload.child("price").val();
          this.product.category = p.payload.child("category").val();
        });
      }
  }

  ngOnInit() {}

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.router.navigate(["/admin/products"]);
  }

  delete(){
    if(!confirm('Are you sure ?')) return;

    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}

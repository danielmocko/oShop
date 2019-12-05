import { Observable } from "rxjs";
import { AngularFireList } from "@angular/fire/database";
import { ProductService } from "./../../../services/product.service";
import { CategoryService } from "./../../../services/category.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { take } from 'rxjs/operators';
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product={};

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {

    this.categories$ = this.categoryService.getCategories().valueChanges();
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id) this.productService.getProduct(id).snapshotChanges().pipe(take(1)).subscribe(p=>this.product=p);
  }

  ngOnInit() {}

  save(product) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }


}

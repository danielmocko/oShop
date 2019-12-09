import { map } from 'rxjs/operators';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor( private categoryService: CategoryService) {
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
   }

  ngOnInit() {
  }

}

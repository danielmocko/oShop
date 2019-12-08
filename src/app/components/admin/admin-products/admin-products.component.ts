import { AppProduct } from './../../../models/app-product';
import { map } from 'rxjs/operators';
import { ProductService } from "./../../../services/product.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface Product {
  key:string;
  category:string;
  price:number;
  imageUrl:string;
  title:string;
}

@Component({
  selector: "admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit {
  dataSource: MatTableDataSource<Product>;
  products:Product[]
  subscripttion :Subscription;
  displayedColumns: string[] = ['title', 'price', 'key'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private productService:ProductService){
   this.productService.getAll().subscribe((data:Product[])=>{
     this.dataSource.data=this.products=data;
   })
      
   this.dataSource= new MatTableDataSource();
  }

  filter(query: string) {
    this.dataSource.filter=query.trim().toLowerCase();
    /*
    this.products=(query)?
      this.dataSource.data.filter(p=>p.title.toLowerCase().includes(query.toLowerCase()))
      :this.dataSource.data
*/
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort; 
  }
}
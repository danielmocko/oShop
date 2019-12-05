import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  
  constructor(private db: AngularFireDatabase) {

  }

  getCategories()  {
    //ref=> ref.orderByValue()
    return this.db.list('/categories');
  }
}

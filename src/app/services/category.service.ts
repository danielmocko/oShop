import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  
  constructor(private db: AngularFireDatabase) {

  }

  getAll()  {
    //ref=> ref.orderByValue()
    return this.db.list('/categories');
  }
}

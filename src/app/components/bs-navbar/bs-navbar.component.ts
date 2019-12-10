import { map } from 'rxjs/operators';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { AppUser } from "./../../models/app-user";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: "bs-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$;

  constructor(private authService: AuthService, private shoppingCartService:ShoppingCartService) {
  }

  logout() {
    this.authService.logout();
  }
  
  async ngOnInit(){
    this.authService.appUser$.subscribe(appUser => (this.appUser = appUser));

    this.cart$= (await this.shoppingCartService.getCartO()).snapshotChanges().pipe(map(x=>
      new ShoppingCart(x.payload.child('items').val())
      
    
      
    ));
    
    
    
      
      
    
  }
}

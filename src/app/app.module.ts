import { ShoppingCartService } from './services/shopping-cart.service';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { UserService } from './services/user.service';
import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./components/check-out/check-out.component";
import { OrderSuccessComponent } from "./components/order-success/order-success.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { AdminProductsComponent } from "./components/admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./components/admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./components/login/login.component";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    BsNavbarComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    NgbModule,
    AngularFireDatabaseModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatInputModule,

    RouterModule.forRoot([
      { path:"",component:ProductsComponent},
      { path: "home", component: HomeComponent },
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "login", component: LoginComponent },
      { path: "check-out", component: CheckOutComponent, canActivate:[AuthGuardService] },
      { path: "order-success", component: OrderSuccessComponent,canActivate:[AuthGuardService] }, 
      { path: "admin/products/new", component: ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      { path: "admin/products/:id", component: ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService] },
      { path: "admin/products", component: AdminProductsComponent, canActivate:[AuthGuardService,AdminAuthGuardService] },

      { path: "admin/orders", component: AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService] },
      { path: "my/orders", component: MyOrdersComponent, canActivate:[AuthGuardService] },
      
     // { path: "**", component: HomeComponent }
    ]),

    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

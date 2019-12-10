import { Product } from './../components/admin/admin-products/admin-products.component';
export class ShoppingCartItem{

    constructor(public product:Product,public quantity:number){}

    get totalPrice(){
        return this.product.price*this.quantity
    }
}
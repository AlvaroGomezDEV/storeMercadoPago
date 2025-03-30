import { inject, Injectable } from "@angular/core";
import { Product } from "@app/models/product.model";
import { CartStore } from "@app/pages/cart.component.store";

@Injectable({
  providedIn: "root",
})
export class CartService {
  readonly store = inject(CartStore);

  addProductToCart(product: Product, quantity: number): void {
    this.store.addProductToCart(product, quantity);
  }
}

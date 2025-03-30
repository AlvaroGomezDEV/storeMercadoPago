import { Component, inject } from "@angular/core";
import { CartStore } from "../cart.component.store";
import { SlicePipe } from "@angular/common";

@Component({
  selector: "app-cart",
  imports: [SlicePipe],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})
export default class CartComponent {
  readonly cartStore = inject(CartStore);

  constructor() {
    console.log(this.cartStore.sortedCartItems());
  }
}

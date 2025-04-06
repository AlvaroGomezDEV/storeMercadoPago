import { Component, inject } from "@angular/core";
import { CartStore } from "../cart.component.store";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-cart",
  imports: [RouterModule, RouterLink],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.css",
})
export default class CartComponent {
  readonly cartStore = inject(CartStore);

  protected taxes: number = 0;

  constructor() {
    this.taxes = Math.round(this.cartStore.priceTotal() * 0.17);
  }
}

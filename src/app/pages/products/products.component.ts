import { Component, inject } from "@angular/core";
import { ProductsStore } from "../products.component.store";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-products",
  imports: [CommonModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export default class ProductsComponent {
  readonly store = inject(ProductsStore);
}

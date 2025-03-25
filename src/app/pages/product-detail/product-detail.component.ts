import { Component, inject, input, OnInit, signal } from "@angular/core";
import { concatMap, filter, pipe } from "rxjs";
import { Product } from "@app/models/product.model";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { ProductsService } from "@app/shared/services/products.service";
import { tapResponse } from "@ngrx/operators";
import { JsonPipe } from "@angular/common";

@Component({
  selector: "app-product-detail",
  imports: [JsonPipe],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export default class ProductDetailComponent implements OnInit {
  readonly productsService = inject(ProductsService);

  readonly productMap = signal<Record<number, Product>>({});

  id = input.required<string>();

  loadProductById = rxMethod<number>(
    pipe(
      filter((id) => !!id && !this.productMap()[id]),
      concatMap((id) => {
        return this.productsService.getProductById(id).pipe(
          tapResponse({
            next: (product) => this.addProduct(product),
            error: () => console.log("error"),
          }),
        );
      }),
    ),
  );

  ngOnInit() {
    this.loadProductById(Number(this.id()));
  }

  addProduct(product: Product) {
    this.productMap.update((productMap) => ({
      ...productMap,
      [product.id]: product,
    }));
  }

  convertToNumber(value: string | null) {
    return Number(value);
  }
}

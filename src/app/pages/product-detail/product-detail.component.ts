import { Component, inject, input, OnInit, signal } from "@angular/core";
import { concatMap, filter, pipe, tap } from "rxjs";
import { Product } from "@app/models/product.model";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { ProductsService } from "@app/shared/services/products.service";
import { tapResponse } from "@ngrx/operators";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CartStore } from "../cart.component.store";

@Component({
  selector: "app-product-detail",
  imports: [ReactiveFormsModule],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export default class ProductDetailComponent implements OnInit {
  private fb = inject(FormBuilder);

  readonly productsService = inject(ProductsService);

  readonly cartStore = inject(CartStore);

  readonly productMap = signal<Record<number, Product>>({});

  protected isLoading: boolean = true;

  protected productError: boolean = false;

  protected halfStar: boolean = false;

  protected quantityForm = this.fb.group({
    quantity: [1, Validators.required],
  });

  id = input.required<string>();

  loadProductById = rxMethod<number>(
    pipe(
      filter((id) => !!id && !this.productMap()[id]),
      concatMap((id) => {
        return this.productsService.getProductById(id).pipe(
          tapResponse({
            next: (product) => this.addProduct(product),
            error: (err) => {
              console.log("error: ", err);
              this.productError = true;
            },
            complete: () => (this.isLoading = false),
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

  addToCart(form: FormGroup) {
    if (form && form.valid) {
      this.cartStore.addProductToCart(
        this.productMap()[this.convertToNumber(this.id())],
        form.value.quantity,
      );
      form.reset({ quantity: 1 });
    } else if (form) {
      form.markAllAsTouched();
    }
  }

  stars() {
    if (
      this.productMap()[this.convertToNumber(this.id())].rating.rate % 1 !==
      0
    )
      this.halfStar = true;
    return Array(
      Math.floor(
        this.productMap()[this.convertToNumber(this.id())].rating.rate,
      ),
    ).fill(0);
  }
}

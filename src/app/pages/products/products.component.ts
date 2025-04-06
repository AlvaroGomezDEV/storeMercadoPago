import { Component, effect, inject } from "@angular/core";
import { ProductsStore } from "../products.component.store";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { Product } from "@app/models/product.model";
import { CartStore } from "../cart.component.store";
import { ToastService } from "@app/shared/services/toast-service.service";

@Component({
  selector: "app-products",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.css",
})
export default class ProductsComponent {
  private fb = inject(FormBuilder);

  readonly cartStore = inject(CartStore);

  readonly productsStore = inject(ProductsStore);

  private toastService = inject(ToastService);

  productForms: { [productId: number]: FormGroup } = {};

  router = inject(Router);

  constructor() {
    effect(() => {
      const products = this.productsStore.allProdutcs();

      if (products.length > 0 && Object.keys(this.productForms).length === 0) {
        this.productsStore.allProdutcs().forEach((product) => {
          this.productForms[product.id] = this.fb.group({
            quantity: [
              1,
              [
                Validators.required,
                Validators.min(1),
                Validators.pattern(/^[0-9]+$/),
              ],
            ],
          });
        });
      }
    });
  }

  goToProductDetail(productId: number) {
    this.router.navigate(["/detail", productId]);
  }

  addToCart(product: Product) {
    const form = this.productForms[product.id];

    if (form && form.valid) {
      const quantity = form.get("quantity")?.value;

      this.cartStore.addProductToCart(product, quantity);
      form.reset({ quantity: 1 });

      this.toastService.success("producto agregado al carrito");
    } else if (form) {
      form.markAllAsTouched();
    }
  }

  getForm(productId: number): FormGroup {
    return this.productForms[productId];
  }

  getQuantityControl(productId: number) {
    return this.getForm(productId)?.get("quantity");
  }
}

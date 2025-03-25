import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { Product } from "../models/product.model";
import { computed, inject } from "@angular/core";
import { ProductsService } from "@app/shared/services/products.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { tapResponse } from "@ngrx/operators";
import { HttpErrorResponse } from "@angular/common/http";

type Status = "loading" | "success" | "error";
type Filter = {
  query: string;
  order: "dec" | "asc";
};

type ProductsState = {
  products: Product[];
  isLoading: Status;
  filter: Filter;
};

const initialState: ProductsState = {
  products: [],
  isLoading: "loading",
  filter: {
    query: "",
    order: "asc",
  },
};

export const ProductsStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed(({ products, filter, isLoading }) => ({
    allProdutcs: computed(() => {
      const direction = filter.order() === "asc" ? 1 : -1;

      return products().toSorted(
        (a, b) => direction * a.title.localeCompare(b.title),
      );
    }),
    countProducts: computed(() => products().length),
    loadingProducts: computed(() => isLoading()),
  })),
  withMethods((store, productsService = inject(ProductsService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: "loading" })),
        switchMap(() => {
          return productsService.getAllProducts().pipe(
            tapResponse({
              next: (products: Product[]) => {
                patchState(store, { products });
              },
              error: (error: HttpErrorResponse) => {
                console.log("error obtenido productos: ", error);
                patchState(store, { isLoading: "error" });
              },
              finalize: () => {
                if (store.isLoading() === "error") {
                  patchState(store, { isLoading: "error" });
                } else patchState(store, { isLoading: "success" });
              },
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit: (store) => {
      store.loadProducts();
    },
  }),
);

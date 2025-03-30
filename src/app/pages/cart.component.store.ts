import { computed } from "@angular/core";
import { Cart, CartItems } from "@app/models/cart.model";
import { Product } from "@app/models/product.model";
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";

type Status = "loading" | "success" | "error";

type Filter = {
  query: string;
  order: "dec" | "asc";
};

type CartState = {
  cart: Cart;
  isLoading: Status;
  filter: Filter;
};

const initialState: CartState = {
  cart: {
    cartItems: [],
  },
  isLoading: "loading",
  filter: {
    query: "",
    order: "asc",
  },
};

export const CartStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store) => ({
    addProductToCart(product: Product, quantity: number): void {
      const existingCartItemIndex = store.cart
        .cartItems()
        .findIndex((item) => item.product.id === product.id);

      if (existingCartItemIndex > -1) {
        const updatedCartItems = store.cart
          .cartItems()
          .map((item, index) =>
            index === existingCartItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );

        patchState(store, {
          cart: { ...store.cart(), cartItems: updatedCartItems },
        });
      } else {
        const newCartItem: CartItems = { product, quantity };

        patchState(store, {
          cart: {
            ...store.cart(),
            cartItems: [...store.cart().cartItems, newCartItem],
          },
        });
      }
    },
  })),
  withComputed(({ isLoading, filter, cart }) => ({
    sortedCartItems: computed(() => {
      const direction = filter.order() === "asc" ? 1 : -1;

      return cart
        .cartItems()
        .toSorted(
          (a, b) => direction * a.product.title.localeCompare(b.product.title),
        );
    }),

    comuntProducts: computed(() => cart.cartItems().length),
    isLoadingCart: computed(() => isLoading()),
    priceTotal: computed(() =>
      cart
        .cartItems()
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    ),
  })),
);

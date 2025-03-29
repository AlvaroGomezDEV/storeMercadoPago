import { computed } from "@angular/core";
import { Cart } from "@app/models/cart.model";
import { signalStore, withComputed, withState } from "@ngrx/signals";

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
    cartItems: [
      {
        product: {
          id: 0,
          title: "",
          price: 0,
          description: "",
          category: "",
          image: "",
          rating: {
            rate: 0,
            count: 0,
          },
        },
        quantity: 0,
      },
    ],
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
  })),
);

import { Product } from "./product.model";

export interface Cart {
  cartItems: CartItems[];
}

export interface CartItems {
  product: Product;
  quantity: number;
}

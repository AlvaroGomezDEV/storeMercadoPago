import { Product } from "./product.model";

export interface Cart {
  cartItems: CartItems[];
}

interface CartItems {
  product: Product;
  quantity: number;
}

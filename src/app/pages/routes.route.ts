import { Routes } from "@angular/router";

export default [
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full",
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./product-detail/product-detail.component"),
  },
  {
    path: "products",
    loadComponent: () => import("./products/products.component"),
  },
  {
    path: "cart",
    loadComponent: () => import("./cart/cart.component"),
  },
] as Routes;

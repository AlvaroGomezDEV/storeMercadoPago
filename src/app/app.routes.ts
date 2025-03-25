import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/routes.route"),
  },
  {
    path: "**",
    redirectTo: "products",
    pathMatch: "full",
  },
];

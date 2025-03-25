import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Product } from "@app/models/product.model";

import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private http = inject(HttpClient);

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  getProductById(id: number = 1) {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
}

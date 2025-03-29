import { Component, inject } from '@angular/core';
import { ProductsStore } from '../products.component.store';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export default class ProductsComponent {
  readonly store = inject(ProductsStore);

  router = inject(Router);

  goToProductDetail(productId: number) {
    console.log('id: ', productId);
    this.router.navigate(['/detail', productId]);
  }
}

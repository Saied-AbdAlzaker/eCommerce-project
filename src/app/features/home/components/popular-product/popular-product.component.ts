import { Component, inject, OnInit } from '@angular/core';
import { CardProductComponent } from "../../../../shared/components/card-product/card-product.component";
import { Product } from '../../../../core/models/products';
import { ProductsService } from '../../../../core/services/products/products.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-product',
  imports: [CardProductComponent,TranslateModule],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.scss'
})
export class PopularProductComponent implements OnInit{

  productsList: Product[] = [];
  private readonly _productsService = inject(ProductsService)

  ngOnInit(): void {
    this.allProducts();
  }

  allProducts(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
      }, error: (err) => {

      }
    })
  }

}

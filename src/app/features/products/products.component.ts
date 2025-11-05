import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardProductComponent } from "../../shared/components/card-product/card-product.component";
import { Product } from '../../core/models/products';
import { ProductsService } from '../../core/services/products/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from '../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardProductComponent, NgxPaginationModule, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productsList: WritableSignal<Product[]> = signal([]);
  pageSize!: number;
  p!: number;
  total!: number;
  searchValue: string = '';
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.allProducts();
  }

  allProducts(pageNumber: number = 1): void {
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        this.productsList.set(res.data);
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      }
    })
  }

}

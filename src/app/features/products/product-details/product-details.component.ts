import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Product } from '../../../core/models/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../cart/servise/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  productId: string | null = null;
  productDetails: Product = {} as Product;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  productOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2500,
    margin: 15,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-left"></i>', '<i class="fa-solid fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getProductId();
    this.getSpecificProduct();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('productId');
      }
    })
  }

  getSpecificProduct(): void {
    this._productsService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      }, error: (err) => {

      }
    })
  }

  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Success');
      }, error: (err) => {
        this.toastr.error(err.error.message, 'Error!');
      }
    })
  }


}

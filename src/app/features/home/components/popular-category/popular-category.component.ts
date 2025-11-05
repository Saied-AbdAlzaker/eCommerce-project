import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../../core/models/category';

@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.scss'
})
export class PopularCategoryComponent implements OnInit {

  categoriesList: Category[] = [];
  private readonly _categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.allCategories();
  }

  categoryOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2500,
    margin: 15,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-right"></i>', '<i class="fa-solid fa-arrow-left"></i>'],
    responsive: {
      0: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  allCategories(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      }, error: (err) => {

      }
    })
  }

}

import { Component } from '@angular/core';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopularCategoryComponent } from "./components/popular-category/popular-category.component";
import { PopularProductComponent } from "./components/popular-product/popular-product.component";

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoryComponent, PopularProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

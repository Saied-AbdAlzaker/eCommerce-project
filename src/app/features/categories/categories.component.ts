import { Component, inject, OnInit } from '@angular/core';
import { ICategory } from './model/category';
import { CategoriesService } from './service/categories.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  
  categoriesList!: ICategory[];

  private _categoriesService = inject(CategoriesService)

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this._categoriesService.allCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      }
    })
  }

}

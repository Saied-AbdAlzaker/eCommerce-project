import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/categories.service';
import { ISpecificCategory } from '../../model/category';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  categoryItem!: ISpecificCategory;
  categoryId!: string;

  constructor(private categoriesService: CategoriesService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe({
      next: (res) => {
        this.categoryId = res['id']
      }
    })
  }

  ngOnInit(): void {
    this.getSpecificCategory(this.categoryId)
  }

  getSpecificCategory(id: string) {
    this.categoriesService.getSpecificCategory(id).subscribe({
      next: (res) => {
        this.categoryItem = res.data;
      }
    })
  }

}

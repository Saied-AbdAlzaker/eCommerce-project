import { Component, OnInit } from '@angular/core';
import { ISpecificBrand } from '../../model/brands';
import { BrandService } from '../../service/brand.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  brandItem!: ISpecificBrand;
  brandId!: string;

  constructor(private brandService: BrandService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe({
      next: (res) => {
        this.brandId = res['id']
      }
    })
  }

  ngOnInit(): void {
    this.getSpecificCategory(this.brandId)
  }

  getSpecificCategory(id: string) {
    this.brandService.getSpecificBrand(id).subscribe({
      next: (res) => {
        this.brandItem = res.data;
      }
    })
  }


}

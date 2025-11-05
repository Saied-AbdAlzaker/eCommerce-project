import { Component, inject } from '@angular/core';
import { IBrands } from './model/brands';
import { BrandService } from './service/brand.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

   brandsList!: IBrands[];

  private brandService = inject(BrandService);

  constructor() { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands() {
    this.brandService.allBrands().subscribe({
      next: (res) => {
        this.brandsList = res.data;
      }
    })
  }

}

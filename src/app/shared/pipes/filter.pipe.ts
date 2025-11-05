import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arrayList: any[], searchItem: string): any[] {
    return arrayList.filter((item)=>{
      return item.title.toUpperCase().includes(searchItem.toUpperCase());
    });
  }

}

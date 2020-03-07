import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayList'
})
export class ArrayListPipe implements PipeTransform {

  transform(value: Array<string>): any {
    if (value) {
      return value.join(', ');
    } else {
      return '';
    }
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import BadWordsFilter from 'bad-words';

@Pipe({
  name: 'profanityFilter',
})
export class ProfanityFilterPipe implements PipeTransform {
  transform(value: string) {
    if (value === undefined || value === '') {
      return '';
    }

    return this.clean(value);
  }

  clean(string: string) {
    console.log(string);
    const filter = new BadWordsFilter();
    const result = filter.clean(string);
    console.log(result);
    return result;
  }
}

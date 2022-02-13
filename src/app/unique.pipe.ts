import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'unique'
})

// NOTE Filter out non-unique farmNames
export class UniquePipe implements PipeTransform {
  transform(value: any): any {
    if (value !== undefined && value !== null) {
      /**
      * TODO This can be more dynamic by returning only farmNames in objects from the component
      * 'farmName' string won't have to be specified in this pipe
      */
      return _.uniqBy(value, 'farmName');
    }
    return value;
  }
}

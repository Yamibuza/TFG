import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'repeat',
  standalone: true,
})
export class RepeatPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'welcome',
  standalone: true
})
export class WelcomePipe implements PipeTransform {
  transform(value: string): string {
    return `Welcome ${value}`;
  }
} 
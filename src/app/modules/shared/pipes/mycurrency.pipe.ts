import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { ConfigService } from '../config.service';
@Pipe({
  name: 'currency',
})
export class MycurrencyPipe implements PipeTransform {
  constructor(private _configService: ConfigService) { }
  transform(
    value: number,
    currencyCode: string = '£',
    display:
      | 'code'
      | 'symbol'
      | 'symbol-narrow'
      | string
      | boolean = 'symbol',
    digitsInfo: string = '0.2-2',
    locale: string = 'en-US',
  ): string | null {
    return formatCurrency(
      value,
      locale,
      getCurrencySymbol(currencyCode, 'wide'),
      currencyCode,
      digitsInfo,
    );
  }
}
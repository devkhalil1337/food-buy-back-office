import { Injectable } from '@angular/core';
import { AppDefaults, AppRegex, DateFormats, FormatType } from '@enums';
import * as moment from 'moment'
@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  private currencyUnit: string = 'USD';
  private currencySymbol: string = '$';

  get businessUnitCurrency(): string {
    return this.currencySymbol || '';
  }

  constructor() { 
  }

  private isInvalidValue(value: any) {
    return (value) == null || isNaN(value) || value === '';
  }

  setCurrencyForBusinessUnit(unit: string, symbol: string) {
    this.currencyUnit = unit || 'USD';
    this.currencySymbol = symbol || '$';
  }

  getDefaultLocale(): any {
    return ['en-US']
    // const unit = this.currencyUnit;
    // switch (unit) {
    //   case 'CAD':
    //     return ['en-CA']; // prefix will be hide, for CAD currency it will displayed as $123 and for US curreny US$123
    //   default:
    //     return ['en-US']; // prefix will be hide, for USD currency it will displayed as $123 and for CAD curreny CA$123
    // }
  }

  formatNumber(value: any, maxFractionDigits: number = 2, minFractionDigits: number = 0): string {
    if (this.isInvalidValue(value)) {
      return '';
    }
    return new Intl.NumberFormat(
      this.getDefaultLocale(), {
      style: 'decimal',
      maximumFractionDigits: maxFractionDigits,
      minimumFractionDigits: minFractionDigits
    }).format(value);
  }

  formatDecimal(value: any, precision: number = AppDefaults.fractionDigits, minPrecision: number = 0): string {
    return this.formatNumber(value, precision, minPrecision);
  }

  formatPercent(value: any, precision: number = AppDefaults.fractionDigits, minPrecision: number = 0, multiplyByHundred: boolean = false): string {
    if (this.isInvalidValue(value)) {
      return '';
    }
    return this.formatDecimal(multiplyByHundred ? 100 * +value : value, precision, minPrecision) + '%';
  }

  formatDate(date: any, format: string = DateFormats.dateSlash): string {
    return date ? moment(date).format(format) : '';
  }

  formatDateTime(date: any, format: string = DateFormats.dateTime24hrSlash): string {
    return date ? moment(date).format(format) : '';
  }
  formatCurrencyFixed(value: any, precision: number = AppDefaults.fractionDigits): string {
    return this.formatCurrency(value, precision, precision);
  }

  formatCurrency(value: any, maxPrecision: number = AppDefaults.fractionDigits, minPrecision: number = 0): string {
    if (this.isInvalidValue(value)) {
      return '';
    }
    return new Intl.NumberFormat(this.getDefaultLocale(), {
      style: 'currency',
      currency: this.currencyUnit, // Bu currency applied
      currencyDisplay: 'symbol',
      maximumFractionDigits: maxPrecision,
      minimumFractionDigits: minPrecision,
    }).format(value);
  }

  formatBUCurrency(value: any, currency: string, maxPrecision: number = AppDefaults.fractionDigits, minPrecision: number = 0): string {
    if (this.isInvalidValue(value)) {
      return '';
    }

    return new Intl.NumberFormat(this.getDefaultLocale(), {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
      maximumFractionDigits: maxPrecision,
      minimumFractionDigits: minPrecision,
    }).format(value);
  }

  formatShortHandCurrency(value: any): string {
    if (this.isInvalidValue(value)) {
      return '';
    }
    const currencySymbol = this.currencySymbol;
    const result = this.formatShortHandNumber(value);
    if (result && result.startsWith('-')) {
      return `-${currencySymbol}` + result.substring(1);
    }
    return currencySymbol + result;
  }

  formatCurrencyByBUCountry(params: any, maxPrecision: number = AppDefaults.fractionDigits, minPrecision: number = 0): string {
    let value = 0;
    const countryCurrencyUnit: string = params.data.countryCurrencyCode;
    if (params.colDef.field === 'amount') {
      value = params.data.amount;
    } else if (params.colDef.field === 'lastApprovedBudget') {
      value = params.data.lastApprovedBudget;
    }

    if (this.isInvalidValue(value)) {
      return '';
    }
    return new Intl.NumberFormat(this.getDefaultLocale(), {
      style: 'currency',
      currency: countryCurrencyUnit,
      currencyDisplay: 'symbol',
      maximumFractionDigits: maxPrecision,
      minimumFractionDigits: minPrecision,
    }).format(value);
  }

  formatShortHandNumber(value: any, maxPrecision: number = AppDefaults.fractionDigits, minPrecision: number = 0): string {
    if (this.isInvalidValue(value)) {
      return '';
    }
    const numericSymbols = AppDefaults.shortHandUnits;
    let symbolIndex = numericSymbols && numericSymbols.length;
    let result: string, multi: number, isNegative: boolean;

    if (value < 0) {
      isNegative = true;
      value *= -1;
    }

    if (value >= 1000) {
      while (symbolIndex-- && result === undefined) {
        multi = Math.pow(1000, symbolIndex + 1);

        if (value % multi !== value) {
          maxPrecision = AppDefaults.shortHandDigits - Math.trunc(value / multi).toString().length;
          result = this.formatNumber(value / multi, maxPrecision, minPrecision) + numericSymbols[symbolIndex];
        }
      }
    }
    if (result === undefined) {
      maxPrecision = AppDefaults.shortHandDigits - Math.trunc(value).toString().length;
      result = this.formatNumber(value, maxPrecision, minPrecision);
    }
    return isNegative ? `-${result}` : result;
  }

  textCapitalize(str: string): string {
    return str ? str.toLowerCase().replace(AppRegex.wordFirstLetter, (s) => s.toUpperCase()) : '';
  }

  replaceAndCapitalize(str: string, find: string = '_', replace: string = ' '): string {
    const temp = str ? str.replace(new RegExp(find, 'g'), replace) : '';
    return this.textCapitalize(temp);
  }

  formatNegativeNumber(value: string): string {
    const str = (value ? parseFloat(value).toFixed(2) : '0.00');
    if (Number(str) < 0) {
      return `(${Number(str) * (-1)})`;
    }
    return str;
  }

  formatTrimmedNumber(value) {

    if (this.isInvalidValue(value)) {
      return '';
    }
    const numericSymbols = AppDefaults.shortHandUnits;
    let symbolIndex = numericSymbols && numericSymbols.length;
    let result: string, multi: number, isNegative: boolean;

    if (value < 0) {
      isNegative = true;
      value *= -1;
    }

    if (value >= 1000) {
      while (symbolIndex-- && result === undefined) {
        multi = Math.pow(1000, symbolIndex + 1);

        if (value % multi !== value) {
          if (value / multi > 10) {
            result = this.formatNumber(value / multi, 0, 0) + numericSymbols[symbolIndex];
          } else {
            result = this.formatNumber(value / multi, 2, 0) + numericSymbols[symbolIndex];
          }
        }
      }
    }
    if (result === undefined) {
      result = this.formatNumber(value, 0, 0);
    }
    return isNegative ? `-${result}` : result;
  }

  formatTrimmedCurrency(value: any): string {
    if (this.isInvalidValue(value)) {
      return '';
    }
    const currencySymbol = this.currencySymbol;
    const result = this.formatTrimmedNumber(value);
    if (result && result.startsWith('-')) {
      return `-${currencySymbol}` + result.substring(1);
    }
    return currencySymbol + result;
  }

  formatGeneric(value: any, type: FormatType, maxPrecision: number = AppDefaults.fractionDigits) {
    switch (type) {
      case FormatType.currency:
        return this.formatCurrency(value, maxPrecision);
      case FormatType.currencyWhole:
        return this.formatCurrency(value, 0);
      case FormatType.currencyFixed:
        return this.formatCurrencyFixed(value, maxPrecision);
      case FormatType.percentage:
        return this.formatPercent(value, maxPrecision);
      case FormatType.percentage100:
        return this.formatPercent(value, maxPrecision, 0, true);
      case FormatType.percentageWhole:
        return this.formatPercent(value, 0);
      case FormatType.decimal:
        return this.formatDecimal(value, maxPrecision);
      case FormatType.number:
        return this.formatNumber(value);
      case FormatType.trimmedNumber:
        return this.formatTrimmedNumber(value);
      case FormatType.shortHandNumber:
        return this.formatShortHandNumber(value);
      case FormatType.shortHandCurrency:
        return this.formatShortHandCurrency(value);
      case FormatType.trimmedCurrency:
        return this.formatTrimmedCurrency(value);
      default:
        return value;
    }
  }
}

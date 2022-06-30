import { Injectable } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { AppRegex } from '@enums';
import { FormatterService } from './format.service';
import * as $ from "jquery"

@Injectable()
export class UtilityService {
  private imageRegex: RegExp;

  constructor(private formatter: FormatterService) {
    this.imageRegex = AppRegex.Image;
  }

  triggerWindowResize(): void {
    window.dispatchEvent(new Event('resize'));
  }

  applyAlphaToHexColor(hex: string, alpha: number) {
    const y = Math.floor(alpha * 255);
    const alphaHex = y.toString(16);
    const ret = y < 16 ? '0' + alphaHex : alphaHex;
    return hex + ret;
  }

  generateRgbColor(darkness: number = 3) {
    // 6 levels of brightness from 0 to 5, 0 being the darkest
    const rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];

    const mix = [darkness * 51, darkness * 51, darkness * 51]; // 51 => 255/5
    const mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map((x) => Math.round(x / 2.0));
    return `rgb(${mixedrgb.join(',')})`;
  }

  generateHslColor(lightNess: number = 50, saturation: number = 60) {
    lightNess = lightNess % 100;
    saturation = saturation % 100;
    return `hsl(${Math.random() * 360}, ${saturation}%, ${lightNess}%)`;
  }

  generateHexColor() {
    // tslint:disable-next-line: no-bitwise
    return `#${((1 << 24) * Math.random() | 0).toString(16)}`;
  }

  // private HSVtoRGB(h, s, v) {
  //   var r, g, b, i, f, p, q, t;
  //   if (arguments.length === 1) {
  //     s = h.s, v = h.v, h = h.h;
  //   }
  //   i = Math.floor(h * 6);
  //   f = h * 6 - i;
  //   p = v * (1 - s);
  //   q = v * (1 - f * s);
  //   t = v * (1 - (1 - f) * s);
  //   switch (i % 6) {
  //     case 0: r = v, g = t, b = p; break;
  //     case 1: r = q, g = v, b = p; break;
  //     case 2: r = p, g = v, b = t; break;
  //     case 3: r = p, g = q, b = v; break;
  //     case 4: r = t, g = p, b = v; break;
  //     case 5: r = v, g = p, b = q; break;
  //   }
  //   return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  // }

  // private goldenRatioConjugate = 0.618033988749895;
  // private h = Math.random();

  // generateHSL() {
  //   // use random start value
  //   this.h = this.h + this.goldenRatioConjugate;
  //   this.h = this.h % 1;

  //   return this.HSVtoRGB(this.h, 0.3, 0.99);
  // }

  // triggerAutoLogout(event: StorageEvent): void {
  //   if ((event.storageArea === localStorage || event.storageArea === sessionStorage) && event.key === StorageKeys.SESSION_KEY) {
  //     const userSession = event.newValue;
  //     if (!userSession) {
  //       window.location.href = '/#/auth/login';
  //     }
  //   }
  // }

  isEmptyObject(obj: any): boolean {
    return Object.entries(obj).length === 0;
  }

  countDecimals(value: number) {
    return (value % 1) !== 0 ? value.toString().split('.')[1].length : 0;
  }

  // getImageUrls(urlString: string): Array<string> {
  //   return urlString.match(this.imageRegex);
  // }

  replaceImageUrls(urlString: string, replaceValue: string = ''): string {
    return urlString.replace(this.imageRegex, replaceValue);
  }

  containsImageUrl(testStr: string): boolean {
    return this.imageRegex.test(testStr);
  }

  containsImageUrlsOnly(testStr: string, allowedCharacter: string = '|'): boolean {
    const replacedStr = this.replaceImageUrls(testStr);
    return replacedStr.length === 0 || new RegExp(`^[${allowedCharacter}\s]+$`).test(replacedStr);
  }

  getMonthDays(monthNumber: number): number {
    monthNumber = Number(monthNumber);
    if (!monthNumber || monthNumber < 0 || monthNumber > 12) {
      return 0;
    }
    if (monthNumber === 2) {
      return 28;
    } else if (monthNumber === 4 || monthNumber === 6 || monthNumber === 9 || monthNumber === 11) {
      return 30;
    } else {
      return 31;
    }
  }

  downloadFile(fileUrl: string, newTab: boolean = false): void {
    if (fileUrl) {
      if (newTab) {
        window.open(fileUrl, '_blank');
      } else {
        window.location.assign(fileUrl);
      }
    }

    // const link = document.createElement('a');
    // link.setAttribute('download', 'name');
    // link.setAttribute('href', fileUrl);
    // link.click();
  }

  // getTodayDate(): string {
  //   return moment().format(DateFormats.default);
  // }

  // matchUrlToRoute(url: string, route: string, allowQueryParams: boolean): boolean {
  //   if (allowQueryParams) {
  //     const strPart: string[] = url.split('?');
  //     url = strPart.length ? strPart[0] : url;
  //   }
  //   // ^catalog\/change-dashboard\/details\/[^/\\s]+$
  //   route = route.replace(AppRegex.routeParams, '[^/\\s]+');
  //   const routeRegex = new RegExp(route, 'gi');
  //   if (url !== undefined && url.length !== 0 && url.replace(routeRegex, '').length === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // getBusinessUnitLogo(bunit: BusinessUnit): string {
  //   return bunit.logoUrl ? bunit.logoUrl : 'assets/images/placeholder.png';
  // }

  // groupArrayByProperty(arr, key) {
  //   return arr.reduce((res, item) => {
  //     (res[item[key]] = res[item[key]] || []).push(item);
  //     return res;
  //   }, {});
  // }

  // groupArrayByPropertySpecificOrder(arr: any[], key, sortMap) {
  //   return sortMap.reduce((result, placement) => {
  //     const selectedObjectsForPlacement = arr.filter(x =>
  //       x[key].toLowerCase() === placement.toLowerCase()
  //     );
  //     if (selectedObjectsForPlacement.length > 0) {
  //       result[placement] = selectedObjectsForPlacement;
  //     }
  //     return result;
  //   }, {});
  // }

  // thumbnailsRenderer(params): any {
  //   if (params.value && this.containsImageUrlsOnly(params.value)) {
  //     let result = '';
  //     const images: Array<string> = this.getImageUrls(params.value);
  //     if (images && images.length > 0) {
  //       images.forEach(imgUrl => {
  //         result += `<a target="_blank" href="${imgUrl}"><img class="pr-1" src="${imgUrl}"/></a>`;
  //       });
  //       params.data.thumbnailsLayout = true;
  //       return result;
  //     }
  //   }
  //   return params.value;
  // }

  // thumbnailsRendererOldVal(params): any {
  //   if (params.value && this.containsImageUrlsOnly(params.value)) {
  //     let result = '';
  //     const images: Array<string> = this.getImageUrls(params.value);
  //     if (images && images.length > 0) {
  //       images.forEach(imgUrl => {
  //         result += `<a target="_blank" href="${imgUrl}"><img class="pr-1" src="${imgUrl}"/></a>`;
  //       });
  //       params.data.thumbnailsLayout = true;
  //       return result;
  //     }
  //   }
  //   let flag = false;
  //   if (params.data.dataSource === 'Master data') {
  //     flag = true;
  //   }
  //   if (flag && params.value) {
  //     return `<span>
  //       <span class="no-wrap-text">${params.value}</span>
  //       <span>*</span>
  //    </span>`;
  //   } else {
  //     return params.value;
  //   }
  // }

  // sortArrByDateTime(arr: any[], key: string = 'createdOn', latestFirst: boolean = false, inputFormat?: string): any[] {
  //   if (arr) {
  //     arr.sort((commentA, commentB) => {
  //       const createdA = moment(commentA[key], inputFormat);
  //       const createdB = moment(commentB[key], inputFormat);
  //       if (createdA.isAfter(createdB)) {
  //         return latestFirst ? -1 : 1;
  //       } else if (createdB.isAfter(createdA)) {
  //         return latestFirst ? 1 : -1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //     return arr;
  //   }
  //   return [];
  // }

  // getUniqueElements(array: any[]): any[] {
  //   return array ? Array.from(new Set(array)) : [];
  // }

  // sortAndMapArray(arr: any[], sortProp: string, mapperCallback: (any) => any): any[] {
  //   if (!arr || arr.length === 0) {
  //     return [];
  //   }
  //   let resultArr = [];
  //   if (mapperCallback) {
  //     resultArr = arr.map(mapperCallback);
  //   }
  //   resultArr = resultArr.sort((a, b) => {
  //     if (+a[sortProp] < +b[sortProp] || isNullOrUndefined(a[sortProp])) {
  //       return 1;
  //     }
  //     if (+a[sortProp] > +b[sortProp] || isNullOrUndefined(b[sortProp])) {
  //       return -1;
  //     }
  //     return 0;
  //   });

  //   return resultArr;
  // }

  // splitAndCleanseArray(arr: string, splitBy: string = ',', mapperCallback: (string) => any = (value) => value ? Number(value) : value): any[] {
  //   if (!arr) {
  //     return [];
  //   }
  //   return this.cleanseArray(arr.split(splitBy).map((value) => value.trim()), mapperCallback);
  // }

  // cleanseArray(arr: any[], mapperCallback: (string) => any = (value) => value ? Number(value) : value): any[] {
  //   if (!arr) {
  //     return [];
  //   }
  //   if (mapperCallback) {
  //     arr = arr.map(mapperCallback);
  //   }
  //   if (arr.every((val) => val === '' || isNullOrUndefined(val))) {
  //     return [];
  //   }
  //   return arr;
  // }

  // getDateRanges(rangeTypes: DateRangeType[], offsetDays?: number, fiscalStart?: string) {
  //   return (rangeTypes || DefaultRanges).map(rangeType => getDateRangeByType(rangeType, offsetDays, fiscalStart));
  // }

  // hideOrShowChartLoader(chartConfig: Chart, showLoading: boolean): void {
  //   if (chartConfig) {
  //     if (chartConfig.ref$) {
  //       chartConfig.ref$.subscribe(chartRef => {
  //         if (showLoading) {
  //           chartRef.hideNoData();
  //           chartRef.showLoading();
  //           chartRef.reflow();
  //         } else {
  //           chartRef.hideLoading();
  //           if (chartRef.noDataLabel || !chartRef.hasData()) {
  //             chartRef.showNoData();
  //           }
  //         }
  //       });
  //     } else if (chartConfig.ref) {
  //       const chartRef: any = chartConfig.ref;
  //       if (showLoading) {
  //         chartRef.hideNoData();
  //         chartRef.showLoading();
  //         chartRef.reflow();
  //       } else {
  //         chartRef.hideLoading();
  //         if (chartRef.noDataLabel || !chartRef.hasData()) {
  //           chartRef.showNoData();
  //         }
  //       }
  //     }
  //   }
  // }

  toggleGridOverlay(gridOptions: GridOptions, showLoading: boolean = false) {
    const gridApi = gridOptions ? gridOptions.api : null;
    if (gridApi) {
      if (showLoading) {
        gridApi.showLoadingOverlay();
      } else {
        gridApi.hideOverlay();
        if (gridApi.getDisplayedRowCount() === 0) {
          gridApi.showNoRowsOverlay();
        }
      }
      (showLoading) ? $('.ag-root-wrapper-body').append('<span class="ag-loading-overlay"></span>')
        : $('.ag-loading-overlay').remove();
    }
  }

  setGridData(gridOptions: GridOptions, data: any[] = [], sizeToFit: boolean = false) {
    if (gridOptions) {
      if (gridOptions.api) {
        this.toggleGridOverlay(gridOptions);
        gridOptions.api.setRowData(data);
        if (sizeToFit) {
          gridOptions.api.sizeColumnsToFit();
        }
      } else {
        gridOptions.rowData = data;
      }
    }
  }

  // /**
  //  * General purpose copy CTOR,
  //  * Can't handle deep copy
  //  *
  //  * Use FromJSON method
  //  * If target has FromJson method defined
  //  *
  //  * @param obj Target object into which props will be copied
  //  * @param source Object to be copied
  //  */
  // castToType<T>(obj: T, source: any): T {
  //   if (typeof obj['fromJSON'] === 'function') {
  //     obj['fromJSON'](source);
  //   } else {
  //     for (const propName in source) {
  //       if (source.hasOwnProperty(propName)) {
  //         obj[propName] = source[propName];
  //       }
  //     }
  //   }
  //   return obj;
  // }

  // getTileSizeClasses(index: number, totalItems?: number) {
  //   return TileBreakpointMap.reduce((classes, item) => {
  //     const size = totalItems ? Math.min(item.size, totalItems) : item.size;
  //     const remainder = index % size;
  //     const bp = item.breakpoint;
  //     classes[`col-${bp}-${12 / size}`] = true;
  //     if (!item.short) {
  //       classes[`pl-${bp}-0`] = remainder; // left most tiles
  //       classes[`pl-${bp}-3`] = !(remainder); // Non left most tiles
  //       classes[`pr-${bp}-3`] = remainder === (size - 1); // Right most tiles
  //       classes[`pr-${bp}-2`] = remainder !== (size - 1); // Non Right most tiles
  //     }
  //     return classes;
  //   }, {});
  // }

  // getAsinTileSizeClasses(index: number, totalItems?: number) {
  //   return GrainerDrainerAsinTileBreakpointMap.reduce((classes, item) => {
  //     const size = totalItems ? Math.min(item.size, totalItems) : item.size;
  //     const remainder = index % size;
  //     const bp = item.breakpoint;
  //     classes[`col-${bp}-${12 / size}`] = true;
  //     if (!item.short) {
  //       classes[`pl-${bp}-0`] = remainder; // left most tiles
  //       classes[`pl-${bp}-3`] = !(remainder); // Non left most tiles
  //       classes[`pr-${bp}-3`] = remainder === (size - 1); // Right most tiles
  //       classes[`pr-${bp}-2`] = remainder !== (size - 1); // Non Right most tiles
  //     }
  //     return classes;
  //   }, {});
  // }


  // toggleBootstrapTooltips(enable: boolean = false) {
  //   // TODO: Remove JQuery Dependency
  //   const container = (<any>$('body'));
  //   if (enable) {
  //     container.tooltip({ trigger: 'hover', placement: 'top', selector: '[data-toggle="tooltip"]' });
  //   } else {
  //     container.tooltip('disable');
  //   }
  // }

  // highcartPointFormatter(point: any, mappedValue?: string) {
  //   if (point.y !== null) {
  //     const value = mappedValue || point.y;
  //     const valueDecimals = point.series.tooltipOptions.valueDecimals;
  //     const type = point.series.tooltipOptions.tooltipType || point.series.tooltipOptions.labelsType;
  //     const suffixData = (point.series.userOptions.suffixData) || [];
  //     let suffixTemplate = '';
  //     let result: string;
  //     if (type) {
  //       result = this.formatter.formatGeneric(value, type, valueDecimals);
  //     } else {
  //       const valueSuffix = point.series.tooltipOptions.valueSuffix;
  //       const valuePrefix = point.series.tooltipOptions.valuePrefix;
  //       const minValueDecimals = point.series.tooltipOptions.minValueDecimals;
  //       result = (valuePrefix || '') + this.formatter.formatNumber(value, valueDecimals, minValueDecimals) + (valueSuffix || '');
  //     }
  //     if (suffixData.length && !isNullOrUndefined(suffixData[point.index])) {
  //       suffixTemplate = `(${this.formatter.formatPercent(suffixData[point.index])})`;
  //     }
  //     return `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${result}</b> ${suffixTemplate}<br/>`;
  //   }
  // }

  // highcartPointFormatterAggBU(point: any, mappedValue?: string) {
  //   if (point.y !== null) {
  //     const value = mappedValue || point.y;
  //     const valueDecimals = point.series.tooltipOptions.valueDecimals;
  //     const type = point.series.tooltipOptions.tooltipType || point.series.tooltipOptions.labelsType;
  //     const suffixData = (point.series.userOptions.suffixData) || [];
  //     let suffixTemplate = '';
  //     let result: string;
  //     if (type) {
  //       result = this.formatter.formatGeneric(value, type, valueDecimals);
  //     } else {
  //       const valueSuffix = point.series.tooltipOptions.valueSuffix;
  //       const valuePrefix = point.series.tooltipOptions.valuePrefix;
  //       const minValueDecimals = point.series.tooltipOptions.minValueDecimals;
  //       result = (valuePrefix || '') + this.formatter.formatNumber(value, valueDecimals, minValueDecimals) + (valueSuffix || '');
  //     }
  //     if (suffixData.length && !isNullOrUndefined(suffixData[point.index])) {
  //       suffixTemplate = `(${this.formatter.formatPercent(suffixData[point.index])})`;
  //     }
  //     let isAggBUCall: boolean = localStorage.getItem('selectedBusinesUnits').split(',').length > 1 ? true : false;
  //     if (isAggBUCall) {
  //       return `<span style="color:${point.color}">\u25CF</span> ${point.series.name} (${point.series.options.buname}): <b>${result}</b> ${suffixTemplate}<br/>`;
  //     } else {
  //       return `<span style="color:${point.color}">\u25CF</span> ${point.series.name}: <b>${result}</b> ${suffixTemplate}<br/>`;
  //     }
  //   }
  // }

  // patchFilterValues(sourceFilters: Filter[] = [], targetFilters: Filter[] = []) {
  //   sourceFilters.forEach((sourceFilter) => {
  //     const targetFilter = targetFilters.find((filter) => filter.modelName === sourceFilter.modelName);
  //     if (targetFilter) {
  //       targetFilter.modelValue = sourceFilter.modelValue;
  //     }
  //   });
  //   targetFilters.forEach((targetFilter) => {
  //     const sourceFilter = sourceFilters.find((filter) => filter.modelName === targetFilter.modelName);
  //     if (!sourceFilter) {
  //       targetFilter.clearValue();
  //     }
  //   });
  // }

  // escapeRegExChars(text: string): string {
  //   return text.replace(AppRegex.regexEscapeChar, '\\$&');
  // }

  // replaceAmpersandWithText(searchText): string[] {
  //   let strToArry = [];
  //   let word = '';
  //   if (Array.isArray(searchText)) {
  //     for (let b = 0; b < searchText.length; b++) {
  //       searchText[b] = searchText[b].replaceAll('&', 'pppp');
  //       searchText[b] = searchText[b].replaceAll('+', 'zzzz');
  //       searchText[b] = searchText[b].replaceAll('%', 'bbbb');
  //       strToArry.push(searchText[b]);
  //     }
  //   }
  //   return strToArry;
  // }

  // replaceTextWithAmpersand(searchText): string[] {
  //   let strToArry = [];
  //   let word = '';
  //   if (Array.isArray(searchText)) {
  //     for (let b = 0; b < searchText.length; b++) {
  //       searchText[b] = searchText[b].replaceAll('pppp', '&');
  //       searchText[b] = searchText[b].replaceAll('zzzz', '+');
  //       searchText[b] = searchText[b].replaceAll('bbbb', '%');
  //       strToArry.push(searchText[b]);
  //     }
  //   } else {
  //     strToArry.push(searchText);
  //   }
  //   return strToArry;
  // }

  // /**
  //  * Maps client account category to human readable form
  //  *
  //  * @param {ClientAccountCategory} category
  //  * @returns {string}
  //  * @memberof UtilityService
  //  */
  // mapClientAccount(category: ClientAccountCategory, type: ClientAccountType): string {
  //   if (type === ClientAccountType.seller) {
  //     return category === ClientAccountCategory.hybrid ? 'Hybrid' : 'Seller';
  //   }
  //   switch (category) {
  //     case ClientAccountCategory.premium:
  //       return 'ARAP';
  //     case ClientAccountCategory.basic:
  //       return 'ARAB';
  //     case ClientAccountCategory.hybrid:
  //       return 'ARAP / ARAB';
  //   }
  // }

  // mapHighchartFormatTypeToGrid(type: FormatType): GridColumnType {
  //   switch (type) {
  //     case FormatType.currency:
  //     case FormatType.currencyFixed:
  //     case FormatType.currencyWhole:
  //     case FormatType.trimmedCurrency:
  //       return GridColumnType.currency;
  //     case FormatType.shortHandCurrency:
  //       return GridColumnType.currencyShort;
  //     case FormatType.percentage:
  //       return GridColumnType.percentage;
  //     case FormatType.percentage100:
  //       return GridColumnType.percentage100;
  //     case FormatType.percentageWhole:
  //       return GridColumnType.percentageWhole;
  //     case FormatType.number:
  //     case FormatType.trimmedNumber:
  //       return GridColumnType.number;
  //     case FormatType.shortHandNumber:
  //       return GridColumnType.decimalShort;
  //     case FormatType.decimal:
  //       return GridColumnType.decimal;
  //     default:
  //       return GridColumnType.text;
  //   }
  // }

  // renamePlacement(placement) {
  //   switch (placement) {
  //     case PlacementType.topOfSearchAmazon:
  //       return PlacementType.spATF;
  //     case PlacementType.otherAmazon:
  //       return PlacementType.spOther;
  //     case PlacementType.detailPageAmazon:
  //       return PlacementType.spDetailPages;
  //     case PlacementType.other:
  //       return PlacementType.sbOther;
  //     case PlacementType.topOfSearch:
  //       return PlacementType.sbTopOfSearch;
  //     default:
  //       return placement;
  //   }
  // }

  // stringToArray(value): any {
  //   let arry = [];
  //   let idsSplited = value.split(',');
  //   idsSplited.forEach(element => {
  //     arry.push(+element);
  //   });
  //   return arry;
  // }

  // profitabilitySelectize(productDetails = false): any {
  //   const data = [{
  //     label: 'High',
  //     value: 'High'
  //   }, {
  //     label: 'Medium',
  //     value: 'Medium'
  //   }, {
  //     label: 'Low',
  //     value: 'Low'
  //   }];

  //   if (productDetails) {
  //     data.push({ label: 'Unassigned', value: 'Unassigned' })
  //   }

  //   return data.map((arr) => {
  //     let label = arr.label;
  //     return {
  //       label: label,
  //       value: arr.value
  //     };
  //   });
  // }

  // camelize(str) {
  //   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
  //     return index === 0 ? word.toLowerCase() : word.toUpperCase();
  //   }).replace(/\s+/g, '');
  // }

}

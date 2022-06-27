import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { GridOptions, ColumnResizedEvent, GridReadyEvent, ColDef } from 'ag-grid-community';
import * as Highcharts from 'highcharts';


import { distinctUntilChanged } from 'rxjs/operators';
import { FormatterService } from './format.service';
import { DateFormats, FormatType } from 'src/app/enums/format-type';

const MIN_HEIGHT = 56;
@Injectable()
export class ConfigService {

  constructor( private formatter: FormatterService) {
  }


  /**
   * Temporary fix until following is resolved
   * AG-2142 - Add autoHeight for headers
   * https://github.com/ag-grid/ag-grid/issues/2361
   *
   * @param event
   */
  private autosizeHeaders(event: any) {
    if (event.finished !== false) {
      event.api.setHeaderHeight(MIN_HEIGHT);
      const headerCells = Array.from(document.querySelectorAll('.ag-header-cell-label'));
      let minHeight = MIN_HEIGHT;
      headerCells.forEach(cell => {
        minHeight = Math.max(minHeight, cell.scrollHeight);
      });
      event.api.setHeaderHeight(minHeight);
    }
  }

  // getSelectizeConfig(maxItems?: any, labelField?: string, valueField?: string, sortField?: string, excludeCustomConfig: boolean = true, direction: string = 'auto'): any {
  //   const config = {
  //     labelField: labelField || 'label',
  //     searchField: [labelField || 'label', 'title'],
  //     sortField: sortField || labelField || 'label',
  //     loadThrottle: 300,
  //     valueField: valueField || 'value',
  //     maxItems: maxItems || null,
  //     dropdownDirection: direction,
  //     plugins: ['dropdown_direction'],
  //     splitOn: AppRegex.selectizeSplitOn,
  //     hideAdd: true,
  //     create: function (input, callback) {
  //       const key = Object.keys(this.options).find(index => {
  //         return this.options[index][this.settings.labelField].toLowerCase() === input.toLowerCase();
  //       });
  //       if (key) {
  //         return this.options[key];
  //       }
  //       return null;
  //     }
  //   };

  //   if (maxItems !== 1) {
  //     config.plugins.push('remove_button');
  //   }

  //   if (!excludeCustomConfig) {
  //     config['onDropdownOpen'] = function ($element) {
  //       const self = this;
  //       /**
  //        * Below methods are copied from Selectize.define('dropdown_direction')
  //        * 1: getPositions
  //        * 2: getDropdownDirection
  //        */

  //       // Get position information for the control and dropdown element.
  //       const getPositions = function () {
  //         const $control = self.$control;
  //         const $window = $('.sidebar .filter-menu'); // replaced window with filter-menu

  //         const control_height = $control.outerHeight(false);
  //         const control_above = $control.offset().top - $window.scrollTop();
  //         const control_below = $window.height() - control_above - control_height;

  //         const dropdown_height = self.$dropdown.outerHeight(false);

  //         return {
  //           control: {
  //             height: control_height,
  //             above: control_above,
  //             below: control_below
  //           },
  //           dropdown: {
  //             height: dropdown_height
  //           }
  //         };
  //       };

  //       // Gets direction to display dropdown in. Either up or down.
  //       const getDropdownDirection = function (positions) {
  //         if (positions.control.below > positions.dropdown.height) {
  //           return 'down';
  //         } else { // otherwise direction with most space
  //           if (direction) {
  //             return direction
  //           } else {
  //             return (positions.control.above > positions.control.below) ? 'up' : 'down';
  //           }
  //         }
  //       };

  //       const pt = getPositions();
  //       this.settings.dropdownDirection = getDropdownDirection(pt);
  //     };
  //   }

  //   return config;
  // }

  // getChartConfig(enabledCustomPositioner: boolean = false, allowLegendTooltips: boolean = false, customExportIcon: boolean = false, sov: boolean = false): any {
  //   const self = this;
  //   let menuItems = ['downloadPNG', 'downloadPDF', 'separator', 'downloadCSV', 'downloadXLS'];
  //   if (sov) {
  //     menuItems = ['downloadCSV', 'downloadXLS'];
  //   }
  //   const config: any = {
  //     chart: {
  //       height: 300,
  //       zoomType: null,
  //       // events: {
  //       //   load: function (event) {
  //       //     if (!this.series.length || !this.xAxis.length || !this.xAxis[0].categories || !this.xAxis[0].categories.length) {
  //       //       this.showLoading();
  //       //     }
  //       //   }
  //       // }
  //     },
  //     boost: {
  //       enabled: false
  //     },
  //     lang: {
  //       numericSymbols: AppDefaults.shortHandUnits,
  //       noData: 'No Data To Display'
  //     },
  //     title: { text: '' },
  //     legend: {
  //       enabled: true,
  //       maxHeight: 60,
  //       align: 'center',
  //       alignColumns: false,
  //       verticalAlign: 'bottom',
  //       useHTML: allowLegendTooltips,
  //       labelFormatter: function () {
  //         const title = this.options.fullName || '';
  //         const titleContent = title ? `data-toggle="tooltip" title="${title}"` : '';
  //         const titleIcon = title ? `<i class="fa fa-info-circle"></i>` : '';
  //         return `<span ${titleContent}>${titleIcon} ${this.name}</span>`;
  //       }
  //     },
  //     plotOptions: {
  //       series: {
  //         dataLabels: {
  //           color: AppColorCodes.chartDataLabel,
  //           formatter: function () {
  //             return self.labelsFormatter(this);
  //           },
  //           style: {
  //             fontSize: '11px',
  //             textOutline: 'none'
  //           }
  //         },
  //         events: {
  //           legendItemClick: function () {
  //             if (allowLegendTooltips) {
  //               // TODO: Remove JQuery + Timeout Dependency
  //               setTimeout(() => {
  //                 (<any>$('[data-toggle="tooltip"], .tooltip')).tooltip('hide');
  //               }, 50);
  //             }
  //           }
  //         }
  //       }
  //     },
  //     credits: { enabled: false },
  //     exporting: {
  //       buttons: {
  //         contextButton: {
  //           menuItems: menuItems
  //         }
  //       },
  //       chartOptions: {
  //         chart: {
  //           height: 900,
  //           width: 1600
  //         },
  //         legend: {
  //           navigation: {
  //             enabled: false
  //           }
  //         }
  //       }
  //     },
  //     tooltip: {
  //       shared: enabledCustomPositioner,
  //       pointFormatter: function () {
  //         return self.utils.highcartPointFormatter(this);
  //       }
  //     },
  //   };

  //   if (enabledCustomPositioner) {
  //     config.tooltip['positioner'] = function (labelWidth, labelHeight, point) {
  //       return self.tooltipPositioner_n(labelWidth, labelHeight, point, this);
  //     };
  //   }
  //   if (customExportIcon) {
  //     Highcharts.Renderer.prototype.symbols.download = function (x, y, w, h) {
  //       const path = [
  //         // Arrow stem
  //         'M', x + w * 0.5, y,
  //         'L', x + w * 0.5, y + h * 0.7,
  //         // Arrow head
  //         'M', x + w * 0.3, y + h * 0.5,
  //         'L', x + w * 0.5, y + h * 0.7,
  //         'L', x + w * 0.7, y + h * 0.5,
  //         // Box
  //         'M', x, y + h * 0.9,
  //         'L', x, y + h,
  //         'L', x + w, y + h,
  //         'L', x + w, y + h * 0.9
  //       ];
  //       return path;
  //     };
  //     config.exporting.buttons.contextButton = {
  //       menuItems: menuItems,
  //       symbol: 'download',
  //       symbolFill: AppColorCodes.success,
  //       symbolStroke: AppColorCodes.success,
  //       verticalAlign: 'top',
  //       align: 'right',
  //       x: 0,
  //       y: 8
  //     };
  //   }
  //   return config;
  // }

  getGridConfig(clientSorting: boolean = false, showOverlayOnReady: boolean = true, sizeToFit: boolean = true, gridReadyCustomCallback?: (params: GridReadyEvent) => void, suppressAutoSize: boolean = false): GridOptions {
    const config: GridOptions = {
      rowData: [],
      singleClickEdit: true,
      // enableColResize: true,
      suppressCellSelection: true, // suppress cell focus
      suppressContextMenu: true,
      enableCellTextSelection: true,
      // enableSorting: true,
      // enableFilter: true,
      rowSelection: 'multiple',
      sortingOrder: ['asc', 'desc'],
      suppressMultiSort: true,
      sideBar: {
        toolPanels: [{
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivotMode: true
          }
        }]
      },
      overlayNoRowsTemplate: 'No Data To Display',
      suppressRowClickSelection: true,
      stopEditingWhenGridLosesFocus: true,
      suppressDragLeaveHidesColumns: true,
      defaultColDef: {
        resizable: true,
        sortable: true,
        autoHeight: !suppressAutoSize,
        cellClass: 'cell-wrap-text',
        lockPinned: true,
        // filterFramework: GridColumnMenuComponent,
        menuTabs: ['columnsMenuTab'],
        minWidth: 100,
        comparator: (nodeA, nodeB) => {
          // Data already sorted from server; don't perform any sort on client side
          return 0;
        },
        headerClass: (params:any) => {
          let hClass = 'text-center';
          if (params.colDef.editable) {
            hClass += ' text-underline';
          }
          return hClass;
        },
        tooltipValueGetter: (data) => {
          const value = data.valueFormatted || data.value;
          return value != null ? value : '';
        }
      },
      defaultColGroupDef: {
        headerClass: 'text-center',
        children: []
      },
      onColumnResized: (event: ColumnResizedEvent) => {
        if ((
          event.source === 'autosizeColumns' ||
          event.source === 'uiColumnDragged' ||
          event.source === 'uiColumnResized' ||
          event.source === 'sizeColumnsToFit')
          && event.finished) {
          this.autosizeHeaders(event);
        }
        if ((event.source === 'uiColumnDragged') && event.finished && !suppressAutoSize) {
          event.api.resetRowHeights();
        }
      },
      onFirstDataRendered: (params) => {
        if (sizeToFit) {
          params.api.sizeColumnsToFit();
        }
      },
      onGridReady: (params: GridReadyEvent) => {
        if (sizeToFit) {
          params.api.sizeColumnsToFit();
        } else {
          this.autosizeHeaders(params);
        }
        if (showOverlayOnReady) {
          params.api.showLoadingOverlay();
        }
        if (gridReadyCustomCallback) {
          gridReadyCustomCallback(params);
        }
      },
      columnTypes: {
        'boolean': {
          tooltipValueGetter: () => ''
        },
        'number': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatNumber(params.value);
          }
        },
        'number-colored': {
          cellClass: (params) => {
            return 'text-right ' + (params.value >= 0 ? 'text-success' : 'text-danger');
          },
          sortingOrder: ['desc', 'asc']
        },
        'decimal': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatDecimal(params.value);
          }
        },
        'decimal-short': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatShortHandNumber(params.value);
          }
        },
        'currency': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatCurrencyFixed(params.value);
          }
        },
        'currency-whole': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatCurrencyFixed(params.value, 0);
          }
        },
        'currency-bu': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            const curreny = params.data.currencyCode || 'USD';
            return this.formatter.formatBUCurrency(params.value, curreny);
          }
        },
        'currency-short': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatShortHandCurrency(params.value);
          }
        },
        'currency-local': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatCurrencyByBUCountry(params);
          }
        },
        'percentageWhole': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatPercent(params.value, 0);
          }
        },
        'percentage': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatPercent(params.value);
          }
        },
        'percentage100': {
          cellClass: 'text-right',
          sortingOrder: ['desc', 'asc'],
          valueFormatter: (params) => {
            return this.formatter.formatGeneric(params.value, FormatType.percentage100);
          }
        },
        'date': {
          cellClass: 'text-right',
          valueFormatter: (params) => {
            return this.formatter.formatDate(params.value);
          }
        },
        'dateTime': {
          cellClass: 'text-right',
          valueFormatter: (params) => {
            return this.formatter.formatDate(params.value, DateFormats.dateTime12hr);
          }
        },
        'dateTime24': {
          cellClass: 'text-right',
          valueFormatter: (params) => {
            return this.formatter.formatDate(params.value, DateFormats.dateTimeSlash24hr);
          }
        },
        'dateTimeAlpha': {
          cellClass: 'text-right',
          valueFormatter: (params) => {
            return this.formatter.formatDate(params.value, DateFormats.dateTimeAlphaMonth);
          }
        },
        'text': {
          cellClass: 'text-left'
        }
      }
    };

    // if (clientSorting) {
    //   config.defaultColDef.comparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
    //     if (isNullOrUndefined(valueA)) {
    //       return isInverted ? -1 : 1;
    //     } else if (isNullOrUndefined(valueB)) {
    //       return isInverted ? 1 : -1;
    //     } else if (!isNaN(Number(valueA)) && !isNaN(Number(valueB)) || (isBoolean(valueA) && isBoolean(valueB))) {
    //       return Number(valueA) - Number(valueB);
    //     } else if (typeof valueA === 'string') {
    //       return valueA.localeCompare(valueB);
    //     }
    //   };
    // }
    return config;
  }

  getGridExportConfig(fileName: string): any {
    return {
      allColumns: true,
      columnSeparator: '',
      onlySelected: false,
      skipFooters: false,
      skipGroups: false,
      skipHeader: false,
      fileName: fileName + '.csv'
    };
  }

  getCheckboxConfig(addHeaderName: boolean = true): ColDef {
    return {
      ...
      this.getConfigForEmptyColumn('Checkbox', addHeaderName),
      width: 45,
      minWidth: 45,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      lockPosition: true
    };
  }

  getConfigForEmptyColumn(headerName: string = '', addHeaderName: boolean = true, excludeFixed: boolean = false): ColDef {
    const override = {
      filter: false, sortable: false
    };
    const colDef: ColDef = excludeFixed ? override : {
      ...
      override,
      ...
      this.getConfigForFixedColumn()
    };
    if (addHeaderName) {
      colDef.headerName = headerName;
      colDef.headerTooltip = headerName;
      // colDef.headerComponentFramework = HeaderMarkupRendererComponent;
      colDef.headerComponentParams = {
        headerMarkup: ''
      };
    }
    return colDef;
  }

  getConfigForFixedColumn(): ColDef {
    return {
      suppressAutoSize: true,
      resizable: false,
      // suppressResize: true,
      suppressMovable: true,
      suppressNavigable: true,
      suppressMenu: true,
      suppressSizeToFit: true
    };
  }

  // getNgbModalOptions(size: 'sm' | 'md' | 'lg' | 'llg' | 'xl' | 'xxl' = 'md', easyClose: boolean = false): NgbModalOptions {
  //   const config: NgbModalOptions = {
  //     backdrop: easyClose || 'static',
  //     keyboard: easyClose,
  //   };
  //   if (size !== 'md') {
  //     config.size = size as any;
  //   }

  //   return config;
  // }

  // getCountrySelectize(maxItems?: any, labelField?: string, valueField?: string): any {
  //   const config = this.getSelectizeConfig(maxItems, labelField, valueField);
  //   config.render = {
  //     item: (item, escape) => {
  //       const name = item[labelField];
  //       const code = item.countryCode;
  //       const codeSm = (code ? code.toLocaleLowerCase() : '');

  //       return `<div>
  //       <span class='st-icon'>
  //         <img src='assets/images/blank.gif' class='flag flag-${codeSm}' />
  //       </span>
  //       <span>${name}</span></div>`;
  //     },
  //     option: (item, escape) => {
  //       const name = item[labelField];
  //       const code = item.countryCode;
  //       const codeSm = (code ? code.toLocaleLowerCase() : '');

  //       return `<div>
  //       <span class='st-icon'>
  //         <img src='assets/images/blank.gif' class='flag flag-${codeSm}' />
  //       </span>
  //       <span>${name}</span>
  //       <span class='text-muted'>(${code})</span>
  //       </div>`;
  //     }
  //   };
  //   return config;
  // }

  // tooltipPositioner_n(labelWidth, labelHeight, point, that) {
  //   let tooltipX = 0;
  //   let tooltipY = 0;
  //   let adjustmentX = 0;
  //   let adjustmentY = point.plotY + that.chart.plotTop - labelHeight;
  //   const boxHalf = labelWidth / 2;

  //   if (point.plotX + boxHalf > that.chart.plotWidth) {
  //     // Right bound overflow
  //     adjustmentX = point.plotX + boxHalf - that.chart.plotWidth + 30;
  //   } else if (point.plotX - boxHalf < 0) {
  //     // left bound overflow
  //     adjustmentX = point.plotX - boxHalf;
  //   }

  //   if (adjustmentY >= 0) {
  //     adjustmentY = 15;
  //   }

  //   tooltipX = point.plotX + that.chart.plotLeft - boxHalf - adjustmentX;
  //   tooltipY = point.plotY + that.chart.plotTop - labelHeight - adjustmentY;

  //   return {
  //     x: tooltipX,
  //     y: tooltipY
  //   };
  // }

  // labelsFormatter(params: any, labelsType?: any) {
  //   if (params.series) {
  //     const useHtml: boolean = params.series.options.dataLabels.useHTML;
  //     const type = labelsType || params.series.tooltipOptions.labelsType || params.series.tooltipOptions.tooltipType;
  //     if (type) {
  //       const result: string = this.formatter.formatGeneric(params.y, type, params.series.tooltipOptions.valueDecimals);
  //       if (!useHtml) {
  //         return result;
  //       }
  //       const style = `style="font-size:11px; color:${AppColorCodes.chartDataLabel};"`;
  //       return `<span ${style}>${result}</span>`;
  //     }
  //     return params.y;
  //   }
  // }

  // getFilterModelConfig(filterName: string, order?: number, changeCallback?: ((filter: Filter) => void) | Subject<Filter>, dataSource?: any, params?: any): Filter {
  //   switch (filterName) {
  //     case CommonFilterNames.asin:
  //     case CommonFilterNames.asins:
  //       // return new Filter('ASINs', FilterType.DropDown, filterName, null, null, null, order || 1, false, changeCallback);
  //       const asinFilter = new Filter('ASINs', FilterType.DropDown, filterName);
  //       asinFilter.orderNumber = 6,
  //         asinFilter.dataSource = dataSource;
  //       asinFilter.getParams = params;
  //       if (changeCallback) {
  //         asinFilter.changeCallBack = changeCallback;
  //       }
  //       return asinFilter;
  //     case CommonFilterNames.poNumber:
  //       // return new Filter('ASINs', FilterType.DropDown, filterName, null, null, null, order || 1, false, changeCallback);
  //       const poFilter = new Filter('PO Number', FilterType.DropDown, filterName);
  //       poFilter.orderNumber = -1,
  //         poFilter.dataSource = dataSource;
  //       poFilter.getParams = params;
  //       if (changeCallback) {
  //         poFilter.changeCallBack = changeCallback;
  //       }
  //       return poFilter;
  //     case CommonFilterNames.distributorView:
  //       return new Filter('Distributor View', FilterType.SingleDropdown, filterName, null, null, null, order || -5, null, changeCallback, null, true);
  //     case CommonFilterNames.clientAccountId:
  //       return new Filter('Amazon Retail Accounts', FilterType.DropDown, filterName, null, null, null, order || 0, false, changeCallback);
  //     case CommonFilterNames.brands:
  //       const brandFilter = new Filter('brands', FilterType.DropDown, filterName);
  //       brandFilter.orderNumber = order || 0,
  //         brandFilter.dataSource = dataSource;
  //       brandFilter.getParams = params;
  //       if (changeCallback) {
  //         brandFilter.changeCallBack = changeCallback;
  //       }
  //       return brandFilter;
  //     // return new Filter('brands', FilterType.DropDown, filterName, null, null, null, order || 0, false, changeCallback);
  //   }
  // }

  // getNewDateRange(selectedRange: DateRangeType = DateRangeType.Last7Days, offsetDays?: number, startDate?: string, endDate?: string, maxDate?: string) {
  //   return new DateRange(selectedRange, this.userService.getSelectedBusinessUnitFiscalStart(), offsetDays, startDate, endDate, maxDate);
  // }

  // initHighchartSync(): void {
  //   (Highcharts as any).Point.prototype.highlight = function (event) {
  //     event = this.series.chart.pointer.normalize(event);
  //     // TODO: Calling mouse over generates an exception :(
  //     // Show the hover marker
  //     // this.onMouseOver();

  //     if (this.series.chart.tooltip.shared && this.series.chart.series) {
  //       const points = [];
  //       this.series.chart.series.forEach((series) => {
  //         if (series.visible && (series.enableMouseTracking === undefined || series.enableMouseTracking)) {
  //           const pointToShow = series.points[this.index];
  //           if (pointToShow) {
  //             points.push(pointToShow);
  //           }
  //         }
  //       });
  //       if (points.length) {
  //         this.series.chart.tooltip.refresh(points);
  //       }
  //     } else {
  //       this.series.chart.tooltip.refresh(this);
  //     }
  //     this.series.chart.xAxis[0].drawCrosshair(event, this);
  //   };
  // }

  // private initBunitSubjects(): void {
  //   this.businessUnitObservable = this.businessUnitSource.asObservable()
  //     .pipe(
  //       distinctUntilChanged((a: BusinessUnit, b: BusinessUnit) => {
  //         for (const key in a) {
  //           if (a.hasOwnProperty(key)) {
  //             if (!b.hasOwnProperty(key) || a[key] !== b[key]) {
  //               return false;
  //             }
  //           }
  //         }
  //         for (const key in b) {
  //           if (b.hasOwnProperty(key)) {
  //             if (!a.hasOwnProperty(key) || a[key] !== b[key]) {
  //               return false;
  //             }
  //           }
  //         }
  //         return true;
  //       })
  //     );

  //   this.businessUnitIdChange = this.businessUnitObservable.pipe(
  //     distinctUntilChanged((a: BusinessUnit, b: BusinessUnit) => {
  //       return ( (a.businessUnitId === b.businessUnitId) && (a.isBUSelected === b.isBUSelected) );
  //     })
  //   );
  // }

  // setBunitInfo(bunits: BusinessUnit[]): void {
  //   this.setBunitIds(bunits.map(({ businessUnitId }) => businessUnitId));
  //   this.bunitInfoSource.next(bunits);
  // }

  // setBunitIds(bunits: number[]): void {
  //   this.bunitIdsSource.next(bunits);
  // }

  // clearBunitIds(): void {
  //   this.bunitIdsSource.next(null);
  //   this.bunitInfoSource.next(null);
  // }

  // setSelectedBusinessUnitModel(selectedBunit: BusinessUnit) {
  //   this.userService.updateSelectedBusinessUnitInfo(selectedBunit);
  //   this.businessUnitSource.next(selectedBunit);
  // }
}


export const DefaultItems = ['copy'];

// export const GetContextMenu = (isDefaultItems, addDefaultItems) => {
//   let allDefaultItems;

//   if (isDefaultItems) {
//     allDefaultItems = DefaultItems;
//   } else {
//     allDefaultItems = [...addDefaultItems, ...DefaultItems];
//   }
//   return allDefaultItems;
// };

export interface ContextMenu {
  name: string;
  action: () => void;
  icon? : any;
}

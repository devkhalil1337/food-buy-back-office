import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef, ViewChild, SimpleChanges, OnChanges, OnDestroy, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { DateRangeType, IntervalType } from 'src/app/enums/date-range';
import { DefaultRanges, getDateRangeByType } from 'src/app/constants/date-range';
import { UtilityService } from '../../utility.service';
import { UserService } from 'src/app/modules/user-auth/user.service';
import { DateRange } from 'src/app/models/date-range.model';
import { ConfigService } from '../../config.service';
import { AppDefaults, DateFormats } from 'src/app/enums';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() dateRange: DateRange;
  @Input() offsetDays: number;
  @Input() disabled: boolean;
  @Input() isChanged: boolean;
  @Input() timePicker: boolean = false;
  @Input() timePicker24Hour: boolean = false;

  @Input() ranges: any;
  @Input() maxDate: string;
  @Input() minDate: string;
  @Input() maxSpan: { years: number, months: number, days: number };
  @Input() interval: IntervalType;
  @Input() componentLabel: IntervalType;
@Input() joyRideStep: number;
  @Output() readonly rangeSubmit: EventEmitter<boolean>; // Boolean represents isIntervalSubmit
  @ViewChild('datePickerRef', { static: true }) DatePickerInput: ElementRef;
  private unsubscribeSource: Subject<any>;
  private config: any;
  private pickerRef: any;
  label: string;
  @HostBinding('class.general-style') generalStyle: Boolean = false;
  @HostBinding('class.homePage-style') homePageStyle: Boolean = false;

  constructor(private utils: UtilityService,
    private userService: UserService,
    private configService: ConfigService,
    private _ref: ElementRef) {
    this.label = '';
    this.rangeSubmit = new EventEmitter<boolean>();
    this.initSubscriptions();
  }

  ngOnInit() {
    this.initPickerConfig();
    this.labelFormatter(this.config.startDate, this.config.endDate);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Reset ranges
    if ((changes.ranges && !changes.ranges.firstChange && this.ranges) ||
      (changes.interval && !changes.interval.firstChange && this.interval) ||
      (changes.minDate && !changes.minDate.firstChange) ||
      (changes.maxDate && !changes.maxDate.firstChange) || this.maxSpan) {
      this.resetPicker();
    }
    if (this.isChanged) {
      this.homePageStyle = true;
    } else {
      this.generalStyle = true;
    }

    if (changes.dateRange && !changes.dateRange.firstChange) {
      this.setDateRange();
    }
  }

  ngAfterViewInit() {
    this.pickerRef = $(this.DatePickerInput.nativeElement);
    this.pickerRef.daterangepicker(this.config, this.labelFormatter.bind(this));
    this.initRangeSubmit();
  }

  ngOnDestroy() {
    this.unsubscribeSource.next();
    this.unsubscribeSource.complete();
  }

  labelFormatter(start, end) {
    if (start && end) {
      this.dateRange.startDate = start;
      this.dateRange.endDate = end;
      this.label = moment(start).format(DateFormats.dateAlphaMonth) + ' - ' + moment(end).format(DateFormats.dateAlphaMonth);
    }
  }

  private initSubscriptions() {
    this.unsubscribeSource = new Subject<any>();
    this.subscribeToBunitChange();
  }

  private subscribeToBunitChange() {
    this.resetPicker();

  }

  private setDateRange(emitChange: boolean = false): void {
    this.pickerRef.data('daterangepicker').setStartDate(this.dateRange.startDate);
    this.pickerRef.data('daterangepicker').setEndDate(this.dateRange.endDate);
    this.labelFormatter(this.dateRange.startDate, this.dateRange.endDate);
    if (emitChange) {
      this.rangeSubmit.emit(false);
    }
  }

  private getDateRanges(rangeTypes: DateRangeType[], offsetDays?: number, fiscalStart?: string, maxDate?: string) {
    return (rangeTypes || DefaultRanges).map(rangeType => getDateRangeByType(rangeType, offsetDays, fiscalStart, maxDate, this.interval));
  }


  private initPickerConfig() {
    this.config = {
      showDropdowns: false,
      buttonClasses: 'btn btn-xs',
      maxDate: this.getMaxDate(),
      timePicker: this.timePicker,
      timePicker24Hour: this.timePicker24Hour,
      minDate: (this.minDate ? moment(this.minDate) : null) || AppDefaults.minDate,
      maxSpan: this.maxSpan || { years: 2 },
      interval: this.interval
    };

    if (this.maxDate) {
      this.config.ranges = this.ranges;
    }
    if (this.dateRange) {
      // if (this.dateRange.label === DateRangeType.FYTD) {
      //   this.dateRange = this.configService.getNewDateRange(this.dateRange.label);
      // }
      if (this.maxDate && this.dateRange.endDate.isAfter(this.maxDate)) {
        this.dateRange.endDate = moment(this.maxDate).clone();
        // if (this.dateRange.label === DateRangeType.Last14Days) {
        //   this.dateRange.startDate =moment(this.maxDate).subtract(14, 'days').clone();
        // }
      }
      [this.config.startDate, this.config.endDate] = [this.dateRange.startDate, this.dateRange.endDate];
    }
  }

  resetPicker() {
    this.initPickerConfig();
    if (this.pickerRef) {
      this.pickerRef.daterangepicker(this.config, this.labelFormatter.bind(this));
    }
    this.initRangeSubmit();
    this.labelFormatter(this.config.startDate, this.config.endDate);
  }

  private initRangeSubmit() {
    if (this.pickerRef) {
      this.pickerRef.on('apply.daterangepicker', (ev, picker) => {
        this.dateRange.label = picker.chosenLabel;
        this.rangeSubmit.emit(false);
      });
    }
  }

  private getMaxDate() {
    return moment(this.maxDate).endOf('day');
  }

  setDateByInterval(interval): void {
    let dateType: DateRangeType;
    switch (interval) {
      case IntervalType.hourly:
        dateType = DateRangeType.Last7Days;
        break;
      case IntervalType.daily:
        dateType = DateRangeType.Last14Days;
        break;
      case IntervalType.weekly:
        dateType = DateRangeType.Last13Weeks;
        break;
      case IntervalType.monthly:
        dateType = DateRangeType.Last6Months;
        break;
    }
    if (dateType) {
      const range = getDateRangeByType(dateType, this.offsetDays, "0", this.maxDate, this.interval);
      [this.dateRange.startDate, this.dateRange.endDate] = [range.startDate, range.endDate];
      this.setDateRange(true);
    }
  }
}

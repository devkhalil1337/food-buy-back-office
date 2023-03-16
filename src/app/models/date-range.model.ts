import * as moment from 'moment';
import { Moment } from 'moment';
import { getDateRangeByType } from '../constants/date-range';
import { DateRangeType, IntervalType } from '../enums/date-range';

export class DateRange {
  startDate: Moment;
  endDate: Moment;
  label: DateRangeType;
  allowInterval?: IntervalType;
  
  // getRange?: () => [Moment, Moment]

  constructor(selectedRange: DateRangeType = DateRangeType.Last7Days, fiscalStart?: string, offsetDays?: number, startDate?: string, endDate?: string, maxDate?: string) {
    this.label = selectedRange;
    if (startDate && endDate) {
      [this.startDate, this.endDate] = [moment(startDate), moment(endDate)];
    } else {
      const range = getDateRangeByType(selectedRange, offsetDays, fiscalStart, maxDate, this.allowInterval);
      [this.startDate, this.endDate] = [range.startDate, range.endDate];
    }
  }

  mappedLabel?: any = () => {
    return this.label === DateRangeType.customRange ? 'Current Period' : this.label;
  }

}
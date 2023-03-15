
import * as moment from 'moment';
import { DateRangeType, IntervalType } from '../enums/date-range';
import { DateRange } from '../models/date-range.model';

export const DefaultRanges = [
  DateRangeType.Yesterday,
  DateRangeType.Last7Days,
  DateRangeType.Last14Days,
  DateRangeType.Last30Days,
  DateRangeType.LastWeek,
  DateRangeType.Last4Weeks,
  DateRangeType.Last13Weeks,
  DateRangeType.Last52Weeks,
  DateRangeType.ThisMonth,
  DateRangeType.LastMonth,
  DateRangeType.Last6Months,
  DateRangeType.YTD,
  DateRangeType.FYTD
];

export const getDateRangeByType = (rangeType: DateRangeType, offsetDays?: number, fiscalStart?: string, maxDate?: string, interval?: string): DateRange => {
  offsetDays = (offsetDays != null || offsetDays != undefined) ? 1 : offsetDays;
  switch (rangeType) {
    case DateRangeType.Today:
      return { startDate: moment(maxDate), endDate: moment(maxDate), label: DateRangeType.Today, allowInterval: IntervalType.daily };
    case DateRangeType.Yesterday:
      // return { startDate: moment().subtract(1, 'days'), endDate: moment().subtract(1, 'days'), label: DateRangeType.Yesterday, allowInterval: IntervalType.daily };
      return { startDate: moment(maxDate).subtract(1, 'days'), endDate: moment(maxDate).subtract(1, 'days'), label: DateRangeType.Yesterday, allowInterval: IntervalType.daily };
    case DateRangeType.Last5Days:
      return { startDate: moment(maxDate).subtract(4 + offsetDays, 'days'), endDate: moment(maxDate).subtract(offsetDays, 'days'), label: DateRangeType.Last5Days, allowInterval: IntervalType.daily };
    case DateRangeType.Last7Days:
      return { startDate: moment(maxDate).subtract(6 + offsetDays, 'days'), endDate: moment(maxDate).subtract(offsetDays, 'days'), label: DateRangeType.Last7Days, allowInterval: IntervalType.daily };
    case DateRangeType.Last14Days:
      return { startDate: moment(maxDate).subtract(13 + offsetDays, 'days'), endDate: moment(maxDate).subtract(offsetDays, 'days'), label: DateRangeType.Last14Days, allowInterval: IntervalType.daily };
    case DateRangeType.Last30Days:
      return { startDate: moment(maxDate).subtract(29 + offsetDays, 'days'), endDate: moment(maxDate).subtract(offsetDays, 'days'), label: DateRangeType.Last30Days, allowInterval: IntervalType.daily };
    case DateRangeType.Last60Days:
      return { startDate: moment(maxDate).subtract(59 + offsetDays, 'days'), endDate: moment(maxDate).subtract(offsetDays, 'days'), label: DateRangeType.Last60Days, allowInterval: IntervalType.daily };
    case DateRangeType.Last90Days:
      return { startDate: moment(maxDate).subtract(89 + offsetDays, 'days'), endDate: moment(maxDate).subtract(offsetDays, 'days'), label: DateRangeType.Last90Days, allowInterval: IntervalType.daily };
    case DateRangeType.LastWeek:
      if (maxDate) {
        if (interval === IntervalType.daily) {
          return { startDate: moment(maxDate).subtract(1, 'week').startOf('week'), endDate: moment(maxDate).subtract(1, 'week').endOf('week'), label: DateRangeType.LastWeek, allowInterval: IntervalType.weekly };
        } else {
          return { startDate: moment(maxDate).startOf('week'), endDate: moment(maxDate).endOf('week'), label: DateRangeType.LastWeek, allowInterval: IntervalType.weekly };
        }
      } else {
        return { startDate: moment(maxDate).subtract(1, 'week').startOf('week'), endDate: moment(maxDate).subtract(1, 'week').endOf('week'), label: DateRangeType.LastWeek, allowInterval: IntervalType.weekly };
      }
    case DateRangeType.Last4Weeks:
      if (maxDate) {
        return { startDate: moment(maxDate).subtract(3, 'week').startOf('week'), endDate: moment(maxDate).endOf('week'), label: DateRangeType.Last4Weeks, allowInterval: IntervalType.weekly };
      } else {
        return { startDate: moment(maxDate).subtract(4, 'week').startOf('week'), endDate: moment(maxDate).subtract(1, 'week').endOf('week'), label: DateRangeType.Last4Weeks, allowInterval: IntervalType.weekly };
      }
    case DateRangeType.Last13Weeks:
      if (maxDate) {
        return { startDate: moment(maxDate).subtract(12, 'week').startOf('week'), endDate: moment(maxDate).endOf('week'), label: DateRangeType.Last13Weeks, allowInterval: IntervalType.weekly };
      } else {
        return { startDate: moment(maxDate).subtract(13, 'week').startOf('week'), endDate: moment(maxDate).subtract(1, 'week').endOf('week'), label: DateRangeType.Last13Weeks, allowInterval: IntervalType.weekly };
      }
    case DateRangeType.Last52Weeks:
      if (maxDate) {
        return { startDate: moment(maxDate).subtract(51, 'week').startOf('week'), endDate: moment(maxDate).endOf('week'), label: DateRangeType.Last52Weeks, allowInterval: IntervalType.weekly };
      } else {
        return { startDate: moment(maxDate).subtract(52, 'week').startOf('week'), endDate: moment(maxDate).subtract(1, 'week').endOf('week'), label: DateRangeType.Last52Weeks, allowInterval: IntervalType.weekly };
      }
    case DateRangeType.ThisMonth:
      return { startDate: moment().startOf('month'), endDate: moment().subtract(offsetDays, 'days'), label: DateRangeType.ThisMonth, allowInterval: IntervalType.daily };
    case DateRangeType.LastMonth:
      if (maxDate) {
        return { startDate: moment(maxDate).startOf('month'), endDate: moment(maxDate).endOf('month'), label: DateRangeType.LastMonth };
      } else {
        return { startDate: moment(maxDate).subtract(1, 'month').startOf('month'), endDate: moment(maxDate).subtract(1, 'month').endOf('month'), label: DateRangeType.LastMonth };
      }
    case DateRangeType.Last3Months:
      if (maxDate) {
        return { startDate: moment(maxDate).subtract(2, 'month').startOf('month'), endDate: moment(maxDate).endOf('month'), label: DateRangeType.Last3Months };
      } else {
        return { startDate: moment(maxDate).subtract(3, 'month').startOf('month'), endDate: moment(maxDate).subtract(1, 'month').endOf('month'), label: DateRangeType.Last3Months };
      }
    case DateRangeType.Last6Months:
      if (maxDate) {
        return { startDate: moment(maxDate).subtract(5, 'month').startOf('month'), endDate: moment(maxDate).endOf('month'), label: DateRangeType.Last6Months };
      } else {
        return { startDate: moment(maxDate).subtract(6, 'month').startOf('month'), endDate: moment(maxDate).subtract(1, 'month').endOf('month'), label: DateRangeType.Last6Months };
      }
    case DateRangeType.Last12Months:
      if (maxDate) {
        return { startDate: moment(maxDate).subtract(11, 'month').startOf('month'), endDate: moment(maxDate).endOf('month'), label: DateRangeType.Last12Months };
      } else {
        return { startDate: moment(maxDate).subtract(12, 'month').startOf('month'), endDate: moment(maxDate).subtract(1, 'month').endOf('month'), label: DateRangeType.Last12Months };
      }
    case DateRangeType.YTD:
      return { startDate: moment(maxDate).startOf('year'), endDate: moment(), label: DateRangeType.YTD };
    case DateRangeType.FYTD:
      return { startDate: fiscalStart ? moment(fiscalStart) : moment().startOf('year'), endDate: moment(), label: DateRangeType.FYTD };
  }
};
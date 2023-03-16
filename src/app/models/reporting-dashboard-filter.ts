import { DateRange } from "./date-range.model";
import { Filter } from "./filter";

export class ReportingDashboardFilter extends Filter {
    dateRange:DateRange;
    orderStatus:Array<string>;
    constructor(){
        super();
        this.dateRange = new DateRange();
        this.startDate = this.dateRange.startDate.format("YYYY-MM-DD");
        this.endDate = this.dateRange.endDate.format("YYYY-MM-DD");
    }
}
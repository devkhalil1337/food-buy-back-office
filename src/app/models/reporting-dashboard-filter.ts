import { DateRange } from "./date-range.model";

export class ReportingDashboardFilter{
    dateRange:DateRange;

    constructor(){
        this.dateRange = new DateRange();
    }
}
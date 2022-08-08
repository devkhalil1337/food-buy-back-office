import * as moment from "moment";

export class BusinessHours{
    businessDaysId:number;
    businessId:number;
    weekDayName:string;
    active:boolean;
    businessTimes:Array<BusinessTimes>
    constructor(){
    }
}


export class BusinessTimes{
    businessTimesId:number;
    businessDaysId:number;
    startDate:string;
    startTime:string;
    endDate:string;
    endTime:string;
    isDeleted?:boolean
    constructor(elm?:BusinessTimes){
        this.startDate = elm.startDate;
        this.endDate = elm.endDate;
        this.startTime = moment(elm.startDate).format("HH:mm:ss") || ""
        this.endTime = moment(elm.endDate).format("HH:mm:ss") || ""
        this.businessDaysId = elm.businessDaysId || null;
        this.businessTimesId = elm.businessTimesId || null;
        this.isDeleted = false;
    }




}



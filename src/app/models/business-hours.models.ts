import * as moment from "moment";

export class BusinessHours{
    businessDaysId:number;
    businessId:number;
    weekDayName:string;
    active:boolean;
    businessTimes:Array<any>
    constructor(){
    }
}


export class BusinessTimes{
    businessTimesId:number;
    startDate:string;
    endDate:string;
    isDeleted?:boolean
    constructor(){
        // this.startDate = elm.startDate;
        // this.endDate = elm.endDate;
        // this.startTime = moment(elm.startDate).format("HH:mm:ss") || ""
        // this.endTime = moment(elm.endDate).format("HH:mm:ss") || ""
        // this.businessDaysId = elm.businessDaysId || null;
        // this.businessTimesId = elm.businessTimesId || null;
        // this.isDeleted = false;
    }





}



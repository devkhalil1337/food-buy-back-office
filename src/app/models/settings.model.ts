export class BusinessSettings{
    SettingsId:number;
    BusinessId:number;
    RegisterNumber:string;
    Vat:number;
    VatType:string;
    ServiceCharges:number;
    MinimumOrder:number;
    AveragePrepareTime:number;
    DeliveryTime:number;
    IsGuestLoginActive:boolean
    IsDeliveryOrderActive:boolean
    IsCollectionOrderActive:boolean
    IsTableOrderActive:boolean

    constructor(){

    }
}
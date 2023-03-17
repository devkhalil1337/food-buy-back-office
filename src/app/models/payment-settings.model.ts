export class PaymentSettings {
    id: number
    businessId: number;
    gatewayName: string;
    apiKey: string;
    apiSecret: string;
    isActive: boolean;
    paymentMode: boolean
}
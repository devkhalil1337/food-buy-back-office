export class Order {
    orderId?: number;
    businessId: number;
    customerId: number;
    orderInvoiceNumber: string;
    orderType: string;
    orderTableId: number;
    orderStatus: string;
    serviceChargeAmount: number;
    discountAmount: number;
    voucherId: number;
    voucherDiscountAmount: number;
    totalAmount: number;
    vatAmount: number;
    vatPercentage: number;
    vatType: string;
    paymentStatus: string;
    paymentMethod: string;
    averagePreparationTime: number;
    comments: string;
    deliveryTime: number;
    customerDeliveryId: number;
    completedBy: string;
    deliveryCharges: number;
    cardPaymentId: string;
    createdDate: Date;
    modifiedDate: Date;
    isDeleted: boolean;
    active: boolean;
    
    constructor(data: any) {
      this.orderId = data.orderId;
      this.businessId = data.businessId;
      this.customerId = data.customerId;
      this.orderInvoiceNumber = data.orderInvoiceNumber;
      this.orderType = data.orderType;
      this.orderTableId = data.orderTableId;
      this.orderStatus = data.orderStatus;
      this.serviceChargeAmount = data.serviceChargeAmount;
      this.discountAmount = data.discountAmount;
      this.voucherId = data.voucherId;
      this.voucherDiscountAmount = data.voucherDiscountAmount;
      this.totalAmount = data.totalAmount;
      this.vatAmount = data.vatAmount;
      this.vatPercentage = data.vatPercentage;
      this.vatType = data.vatType;
      this.paymentStatus = data.paymentStatus;
      this.paymentMethod = data.paymentMethod;
      this.averagePreparationTime = data.averagePreparationTime;
      this.comments = data.comments;
      this.deliveryTime = data.deliveryTime;
      this.customerDeliveryId = data.customerDeliveryId;
      this.completedBy = data.completedBy;
      this.deliveryCharges = data.deliveryCharges;
      this.cardPaymentId = data.cardPaymentId;
      this.createdDate = new Date(data.createdDate);
      this.modifiedDate = new Date(data.modifiedDate);
      this.isDeleted = data.isDeleted;
      this.active = data.active;
    }
  }
  
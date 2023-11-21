import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/models/order';
import { ToasterService } from 'src/app/modules/shared';
import { ORDERSTATUS } from 'src/app/enums/const';
import { OrdersService } from '../orders.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  OrderDetails: any;
  Order: Order;
  address: any;
  orderStatus: any;
  subtotal = 0;
  isloading: boolean = false
  constructor(private ordersService: OrdersService, private activatedRoute: ActivatedRoute, private toasterService: ToasterService) {
    this.isloading = false;
    this.orderStatus = ORDERSTATUS
  }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.isloading = true;
    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!orderId)
      return;
    forkJoin(
      this.ordersService.getOrder(orderId),
      this.ordersService.getOrderDetails(orderId),
    ).subscribe(([orderResponse, OrderDetailsResponse]) => {
      this.Order = new Order(orderResponse);
      this.OrderDetails = OrderDetailsResponse;
      this.getAddressById();
      this.getSubTotal();
      this.isloading = false;
    }, (error) => {
      this.isloading = false;
      console.log(error)
    });
  }


  getAddressById() {
    this.ordersService.getAddressById(this.Order.customerDeliveryId).subscribe(response => {
      this.address = response;
    })
  }

  updateStatus(params: any) {
    console.log(params)
    const orderNumber = params.orderInvoiceNumber;
    const orderStatus = params.orderStatus;
    this.ordersService.updateOrderStatus(orderNumber, orderStatus).subscribe(response => {
      if (response) {
        this.toasterService.success(`Order Status has been updated to ${orderStatus}`);
        this.getOrderDetails();
      }
    })
  }

  getSubTotal(): void {
    this.subtotal = 0;

    this.OrderDetails?.forEach(orderDetail => {
      if (orderDetail.productQuantity && orderDetail.productPrice) {
        this.subtotal += orderDetail.productQuantity * orderDetail.productPrice;

        if (orderDetail.productChoiceOfGroups && orderDetail.productChoiceOfGroups.length > 0) {
          // Calculate subtotal for each choice and add to the total
          orderDetail.productChoiceOfGroups.forEach(choice => {
            if (choice.choicePrice) {
              this.subtotal += choice.choicePrice * orderDetail.productQuantity;
            }
          });
        }
      }
    });
  }


}

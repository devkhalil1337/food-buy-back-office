import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrdersDetailsService } from './orders-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  OrderDetails: any;
  Order: Order;
  address: any;
  constructor(private orderDetailsService: OrdersDetailsService, private activatedRoute: ActivatedRoute) {
    console.log()
  }

  ngOnInit(): void {
    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!orderId)
      return;
    forkJoin(
      this.orderDetailsService.getOrder(orderId),
      this.orderDetailsService.getOrderDetails(orderId),
    ).subscribe(([orderResponse, OrderDetailsResponse]) => {
      this.Order = new Order(orderResponse);
      this.OrderDetails = OrderDetailsResponse;
      this.getAddressById();
    });
  }


  getAddressById() {
    this.orderDetailsService.getAddressById(this.Order.customerDeliveryId).subscribe(response => {
      this.address = response;
    })
  }

}

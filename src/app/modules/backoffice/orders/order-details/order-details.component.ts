import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OrdersDetailsService } from './orders-details.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  OrderDetails:any;
  Order:any;
  address:any;
  constructor(private orderDetailsService:OrdersDetailsService,private activatedRoute: ActivatedRoute) { 
    console.log()
  }

  ngOnInit(): void {
    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if(!orderId)
      return;
      forkJoin(
        this.orderDetailsService.getOrder(orderId),
        this.orderDetailsService.getOrderDetails(orderId),
      ).subscribe(([orderResponse, OrderDetailsResponse]) => {
        this.Order = orderResponse;
        this.OrderDetails = OrderDetailsResponse;
        this.getAddressById();
      });
    }
    
    
    getAddressById(){
      this.orderDetailsService.getAddressById(this.Order.customerId).subscribe(response => {
        this.address = response;
    })
  }

}

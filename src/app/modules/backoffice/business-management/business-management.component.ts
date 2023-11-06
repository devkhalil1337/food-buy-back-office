import { Component, OnInit } from '@angular/core';
import { BusinessManagementService } from './business-management.service';
import { ModalService } from '../../shared/modal.service';
import { Business } from 'src/app/models/business.model';
import { ConfigService } from '../../shared';

@Component({
  selector: 'app-business-management',
  templateUrl: './business-management.component.html',
  styleUrls: ['./business-management.component.scss']
})
export class BusinessManagementComponent implements OnInit {

  business: Business;
  BusinessList: any;
  localization: ['en', 'fr'];
  selectizeConfig: any;
  constructor(private busienssService: BusinessManagementService, private modalService: ModalService, private configService: ConfigService) {
    this.business = new Business();
    this.selectizeConfig = this.configService.getSelectizeConfig(1);
  }

  ngOnInit(): void {
    this.getBusinessList();
  }

  getBusinessList() {
    this.busienssService.getAllBusinesses().subscribe(response => {
      this.BusinessList = response;
    })
  }

  editBusiness(content: any, business?: Business) {
    if (this.business) {
      this.business = { ...business };
    }
    this.modalService.openModal(content);
  }

  onBusinessSave(close: any) {
    console.log(this.business)
    this.busienssService.AddBusinesses(this.business).subscribe(response => {
      console.log(response);
      if (response?.success) {
        this.getBusinessList();
      }
    });
    close();
  }
  onModalAction(modalVar: any) {
    modalVar();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessSettings } from 'src/app/models/settings.model';
import { ConfigService, ToasterService } from '@shared';
import { SettingsService } from './settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  businessSettings: FormGroup;
  VATTypes: any;
  selectizevatTypeConfig: any;
  loading: boolean = false;
  private Subscription: Subscription;
  constructor(private _settingServices: SettingsService,
    private toasterService: ToasterService,
    private configService: ConfigService) {
    this.selectizevatTypeConfig = this.configService.getSelectizeConfig(1);
    this.getBusinessSettings();
  }

  ngOnInit(): void {
    this.VATTypes = [
      { label: 'inclusive', value: 'Inclusive' },
      { label: 'exclusive', value: 'Exclusive' }
    ];
    this.businessSettings = new FormGroup({
      settingsId: new FormControl(null),
      businessId: new FormControl(Number(this.configService.businessId)),
      registerNumber: new FormControl(""),
      vat: new FormControl(0, Validators.required),
      vatType: new FormControl("Inclusive", Validators.required),
      serviceCharges: new FormControl(0),
      deliveryCharges: new FormControl(0),
      minimumOrder: new FormControl(0, Validators.required),
      averagePrepareTime: new FormControl(0),
      deliveryTime: new FormControl(0),
      isGuestLoginActive: new FormControl(false),
      isDeliveryOrderActive: new FormControl(false),
      isCollectionOrderActive: new FormControl(false),
      isTableOrderActive: new FormControl(false)
    })

  }

  ngOnDestroy(): void {
    this.Subscription.unsubscribe();
  }


  getBusinessSettings() {
    this.Subscription = this._settingServices.getSettings().subscribe((response: BusinessSettings) => {
      this.businessSettings.patchValue(response);
    }, error => {
      console.log(error)
      this.toasterService.error(error)
    })
  }


  onSaveSettings() {
    this.loading = true;
    const settingId = this.businessSettings.get('settingsId').value;
    forkJoin(settingId ? this._settingServices.UpdateNewSettings(this.businessSettings.value) : this._settingServices.AddNewSettings(this.businessSettings.value))
      .subscribe((response: any) => {
        this.loading = false;
        if (response && response.message && response.message.length > 0)
          this.toasterService.error(response.message)
        else
          this.toasterService.success("Settings updated!")
      }, error => {
        console.log(error)
        this.loading = false;
        this.toasterService.error(error)
      })
  }

}

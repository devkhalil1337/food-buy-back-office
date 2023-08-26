import { Component, OnInit } from '@angular/core';
import { MenusService } from './menus.service';
import { Menus } from 'src/app/models/menus.model';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  menus: Menus[]

  constructor(private menuService: MenusService) {
  }

  ngOnInit(): void {
    this.getMenus();
  }


  getMenus() {
    this.menuService.getMenus().subscribe(response => {
      this.menus = response;
      console.log(this.menus)
    })
  }

  saveBulkMenus() {
    this.menuService.updateBulkMenus(this.menus).subscribe(response => {
    })
  }

  onMenuChange(menu: Menus) {
    this.menus.filter(me => {
      if (me.id == menu.id) {
        me = menu;
      }
      return me;
    })
  }
}

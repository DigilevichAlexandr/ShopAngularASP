import { Component, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { Buy } from '../buy';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { SidenavService } from '../sidenav-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  ;
  //public bag:Buy[] = [];
  //public items;

  constructor(private sidenavService: SidenavService,
    public productService: ProductService,
    public cookieService: CookieService) {
    this.productService.items = +cookieService.get('bag');
  }

  toggled() {
    this.sidenavService.toggle();
  }
}

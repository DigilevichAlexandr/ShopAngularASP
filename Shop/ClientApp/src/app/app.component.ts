import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { MatDrawer } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { Buy } from './buy';
import { HttpService } from './http.service';
import { Product } from './product';
import { ProductService } from './product.service';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SidenavService } from './sidenav-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showFiller = false;
  title = 'app';
  items = 0;
  valid = true;
  result = '';
  products:Buy[] = [];
  sum=0;
  //buySuccess = false;

  constructor(private httpService: HttpService, private sidenavService: SidenavService, public productService: ProductService,
    public cookieService: CookieService) { }

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;
  @ViewChild('sidebar') public sidebar: SideBarComponent;

  ngOnInit() {
    this.sidenavService.setDrawer(this.drawer);
    
  }

  bay() {
    debugger;
    this.httpService.stock(JSON.parse(this.cookieService.get('products')))
      .subscribe((data: boolean) => {
        this.valid = data;
        debugger;
        if (this.valid) {
          this.buyHttp();
        }
        else {
          this.result = 'No product on stock.';
          this.productService.shoppingBag = [];
          this.productService.items = 0;
          this.items = 0;
          this.cookieService.set('bag', '0');
          this.cookieService.set('products', '');
        }
      });
  }

  buyHttp() {
    this.httpService.buy(JSON.parse(this.cookieService.get('products')))
      .subscribe((buyResult: boolean) => {
        debugger;
        alert(buyResult);
        this.result = buyResult ? 'Thank you' : 'Sorry, error';
        this.productService.shoppingBag = [];
        this.productService.items = 0;
        this.items = 0;
        this.cookieService.set('bag', '0');
        this.cookieService.set('products', '');
      });
  }

  onOpenedChange(e: boolean){
    debugger;
    this.products = JSON.parse(this.cookieService.get('products'));
    this.sum = this.products.reduce((sum, current) => sum + current.amount * current.price, 0);
  }
}

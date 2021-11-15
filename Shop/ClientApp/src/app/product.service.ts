import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Buy } from './buy';
import { Product } from './product';

@Injectable()
export class ProductService {
  public products: Product[];
  public category: string;
  public details: Product;
  public shoppingBag: Buy[] = [];
  public items: number = 0;

  constructor(private cookieService: CookieService) {
    this.items = +this.cookieService.get('bag').split(',')[1];
  }
}

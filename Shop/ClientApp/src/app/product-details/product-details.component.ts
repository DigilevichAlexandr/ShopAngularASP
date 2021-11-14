import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Buy } from '../buy';
import { HttpService } from '../http.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private valid: boolean = true;
  private amount: number = 0;
  private product: Product = this.productService.details;
  private guid: string;
  constructor(private httpService: HttpService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.guid = params.product;
        if (!this.product)
          this.httpService.getProduct(this.guid)
            .subscribe((data: Product) => {
              this.product = data;
            });
        this.httpService.stock(new Buy(this.guid, this.amount))
          .subscribe((data: boolean) => {
            this.valid = data;
          });
      }
      );
  }

  onAmountChange(searchValue: number) {
    this.httpService.stock(new Buy(this.guid, searchValue))
      .subscribe((data: boolean) => {
        this.valid = data;
      });
  }

  buy() {
    this.productService.shoppingBag.push(new Buy(this.guid, this.amount));
    this.cookieService.set('bag', this.guid + ',' + this.amount);
  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  public valid: boolean = true;
  public amount: number = 0;
  public product: Product = this.productService.details;
  private guid: string;
  public image;
  constructor(private sanitizer: DomSanitizer,
    private httpService: HttpService,
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
              this.initImage();
            });

        this.initImage();
        this.httpService.stock([new Buy(this.guid, this.amount, this.product.name, this.product.price)])
          .subscribe((data: boolean) => {
            this.valid = data;
          });
      }
      );
  }

  initImage() {
    const byteCharacters = atob(this.product.picture);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpg" });
    let unsafeImageUrl = URL.createObjectURL(blob);
    this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    this.httpService.stock([new Buy(this.guid, this.amount, this.product.name, this.product.price)])
      .subscribe((data: boolean) => {
        this.valid = data;
      });

  }

  onAmountChange(searchValue: number) {
    this.httpService.stock([new Buy(this.guid, searchValue, this.product.name, this.product.price)])
      .subscribe((data: boolean) => {
        this.valid = data;
      });
  }

  buy() {
    if (this.valid) {
      this.productService.shoppingBag.push(new Buy(this.guid, this.amount, this.product.name, this.product.price));
      var productsJason = this.cookieService.get('products');

      if (productsJason) {
        var p: Buy[] = JSON.parse(productsJason);
        p.push(new Buy(this.guid, this.amount, this.product.name, this.product.price));
        this.cookieService.set('products', JSON.stringify(p));
      }
      else {
        this.cookieService.set('products', JSON.stringify([new Buy(this.guid, this.amount, this.product.name, this.product.price)]));
      }

      var items = +this.cookieService.get('bag');
      this.cookieService.set('bag', (items + this.amount).toString());


      //this.cookieService.set('products', products + this.product.name + ',' + this.amount + ' ');
      this.productService.items = items + this.amount;

    }
  }
}

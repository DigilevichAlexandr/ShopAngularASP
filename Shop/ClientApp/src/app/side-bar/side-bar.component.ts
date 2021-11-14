import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private httpService: HttpService,
    private productService: ProductService) { }

  ngOnInit() {
    this.getProducts("1");
  }

  public getProducts(category: string): void {
    this.productService.category = category;
    this.httpService.getProducts(category)
      .subscribe((data: any[]) => {
        this.productService.products = data;
      });
  };
}

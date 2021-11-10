import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Product } from '../product';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  products: Product[];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getProducts('1');
  }

  public getProducts(category: string): void {
    this.httpService.getProducts(category)
      .subscribe((data: any[]) => {
        this.products = data;
      });
  };
}

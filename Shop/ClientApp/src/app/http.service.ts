import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buy } from './buy';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getProducts(category: string) {
        return this.http.get('/Product/' + category)
  }

  getProduct(guid: string) {
    return this.http.get('/Product/product/' + guid)
}

  stock(buy: Buy) {
    return this.http.post('/Product/Stock', [buy])
}
}

import { Injectable } from '@angular/core';
import { Buy } from './buy';
import { Product } from './product';

@Injectable()
export class ProductService {
  public products: Product[];
  public category: string;
  public details: Product;
  public shoppingBag: Buy[];
}

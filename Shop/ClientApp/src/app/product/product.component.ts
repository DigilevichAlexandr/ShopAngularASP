import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../product.service';
import { HighlightSpanKind } from 'typescript';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  constructor(private sanitizer: DomSanitizer,
    private productService: ProductService,
    private router: Router) { }
  image;

  ngOnInit() {
    const byteCharacters = atob(this.product.picture);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {

      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpg" });
    let unsafeImageUrl = URL.createObjectURL(blob);
    this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  }

  buy() {
    this.productService.details = this.product;
    this.router.navigate(['details'], { queryParams: { product: this.product.guid } });
  }
}

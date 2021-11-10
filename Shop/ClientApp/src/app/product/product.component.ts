import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  constructor(private sanitizer: DomSanitizer) { }
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

  addToBag()
  {
    
  }
}

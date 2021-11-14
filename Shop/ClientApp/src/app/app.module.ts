import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component'; import { SideBarComponent } from './side-bar/side-bar.component';
import { ProductComponent } from './product/product.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductService } from './product.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SideBarComponent,
    ProductComponent,
    ShoppingBagComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'details', component: ProductDetailsComponent }
    ]),
    NoopAnimationsModule
  ],
  providers: [
    ProductService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

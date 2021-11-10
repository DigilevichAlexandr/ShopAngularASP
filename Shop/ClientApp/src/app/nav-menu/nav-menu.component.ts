import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Product } from '../product';
import { SidenavService } from '../sidenav-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  bag:Product[] = [];

  constructor(private sidenavService: SidenavService) { }

  toggled() {
    this.sidenavService.toggle();
  }
}

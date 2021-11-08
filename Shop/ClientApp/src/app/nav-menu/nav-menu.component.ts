import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { NavigationService } from '../navigation.service';
import { SidenavService } from '../sidenav-service.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private sidenavService: SidenavService) { }

  toggled() {
    this.sidenavService.toggle();
  }
}

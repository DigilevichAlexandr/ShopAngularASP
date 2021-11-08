import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { SidenavService } from './sidenav-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  showFiller = false;
  title = 'app';

  constructor(private sidenavService: SidenavService) { }
  
  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;

  ngOnInit() {
    this.sidenavService.setDrawer(this.drawer);
  }
}

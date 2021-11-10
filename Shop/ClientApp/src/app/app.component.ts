import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { Product } from './product';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SidenavService } from './sidenav-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showFiller = false;
  title = 'app';
  items = 0;

  constructor(private sidenavService: SidenavService) { }

  @ViewChild('drawer', { static: true }) public drawer: MatDrawer;
  @ViewChild('sidebar', { static: false }) public sidebar: SideBarComponent;

  ngOnInit() {
    this.sidenavService.setDrawer(this.drawer);
  }
}

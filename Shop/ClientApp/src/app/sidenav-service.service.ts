import { Injectable, EventEmitter } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidenavService {
 public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }   
  private drawer: MatDrawer;

  setDrawer(drawer: MatDrawer) {
      this.drawer = drawer;
  }

  toggle(): void {
      this.drawer.toggle();
  }
}
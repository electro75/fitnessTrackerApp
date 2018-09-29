import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  isAuth$: Observable<Boolean>;
  authSubscription: Subscription

  constructor(private authService: AuthService, private __store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.isAuth$ = this.__store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }


}

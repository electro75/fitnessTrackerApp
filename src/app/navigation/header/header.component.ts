import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store'

import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()toggleSidenav = new EventEmitter<void>();
  isAuth$: Observable<Boolean>;

  constructor(private __strore: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.__strore.select(fromRoot.getIsAuth)
  }

  toggleNav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}

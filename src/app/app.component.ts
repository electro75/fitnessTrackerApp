import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  @ViewChild('sidenav') sidenav;

  constructor(private authService: AuthService) {  }

  toggleNav() {
    this.sidenav.toggle();
  }

  ngOnInit() {
    this.authService.initAuthListener();
  }

}

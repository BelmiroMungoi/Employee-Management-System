import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee-Management-System';

  constructor() {}

  public hideMenu() {
    if (localStorage.getItem('access_token') != null &&
      localStorage.getItem('access_token')?.toString().trim() != null) {
        return false;
    } else {
      return true;
    }
  }

}

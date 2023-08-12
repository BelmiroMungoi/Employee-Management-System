import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee-Management-System';
  firstname!: any;
  lastname!: any;
  email!: any;
  isEnabled!: any;
  role!: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.toggleSideBar();
    this.getUserDetails();
  }

  public hideMenu() {
    if (localStorage.getItem('access_token') != null &&
      localStorage.getItem('access_token')?.toString().trim() != null) {
        return false;
    } else {
      return true;
    }
  }

  public getUserDetails() {
    this.firstname = sessionStorage.getItem('firstname'); 
    this.lastname = sessionStorage.getItem('lastname');
    this.email = sessionStorage.getItem('email');
    this.isEnabled = sessionStorage.getItem('isEnabled');
    this.role = sessionStorage.getItem('role');
  }

  public logOut() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['login'])
  }

   public toggleSideBar() {    
    const select = (el: any, all = false) => {
      el = el.trim()
      if (all) {
        return [document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type: any, el: any, listener: any, all = false) => {
      if (all) {
        select(el, all).forEach((e: any) => e.addEventListener(type, listener))
      } else {
        select(el, all).addEventListener(type, listener)
      }
    }

    if (select('.toggle-sidebar-btn')) {
      on('click', '.toggle-sidebar-btn', function(e: any) {
        select('body').classList.toggle('toggle-sidebar')
      })
    }
  }

}

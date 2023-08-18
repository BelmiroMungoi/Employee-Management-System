import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from './service/image.service';
import { UserService } from './service/user.service';

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
  base64Data!: any;
  retrieveResponse!: any;
  url = "";

  constructor(private router: Router, private imageService: ImageService, private userService: UserService) {}

  ngOnInit(): void {
    this.toggleSideBar();
    this.getUserDetails();
    this.showImage();
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
    this.userService.getUserById().subscribe(response => {
      this.firstname = response.firstname;
      this.lastname = response.lastname;
      this.email = response.email;
      this.role = response.role;
    })
  }

  public getImage() {
    this.imageService.downloadImage().subscribe(response => {
      this.retrieveResponse = response;
      this.base64Data = this.retrieveResponse.image;
      this.url= 'data:' + this.retrieveResponse.fileType + ';base64,' + this.base64Data;
    })
  }

  public showImage() {
    if (this.getImage() == null) {
      this.url = "./assets/img/default-profile.png";
    } else {
      this.getImage();
    }
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

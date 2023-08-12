import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  
  firstname!: any;
  lastname!: any;
  email!: any;
  isEnabled!: any;
  role!: any;
  
  ngOnInit(): void {
    this.getUserDetails();
  }

  public getUserDetails() {
    this.firstname = sessionStorage.getItem('firstname'); 
    this.lastname = sessionStorage.getItem('lastname');
    this.email = sessionStorage.getItem('email');
    this.isEnabled = sessionStorage.getItem('isEnabled');
    this.role = sessionStorage.getItem('role');
  }
}

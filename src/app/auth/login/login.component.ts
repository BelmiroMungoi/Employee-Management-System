import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from '../../model/login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  loginRequest!: LoginRequestPayload
  userData: any;   

  constructor(private loginService: LoginService, private router: Router, private toastr: ToastrService) {
      this.loginRequest = {
        email: '',
        password: ''
      };
     }

  doLogin() {
    if (this.loginForm.valid) {
      this.loginRequest.email = this.loginForm.get('email')?.value;
      this.loginRequest.password = this.loginForm.get('password')?.value;

      this.loginService.login(this.loginRequest).subscribe((data) => {
        var token = JSON.parse(JSON.stringify(data)).Authorization;
        localStorage.setItem("access_token", token);
        this.router.navigate(['home'])
        this.userData = data;
        console.log(data);
        console.log(token);
      },
        error => {
          console.error("Erro ao fazer login " + error);
        });
    } else {
      this.toastr.warning('Insira Dados Válidos')
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
    if (localStorage.getItem('access_token') != null &&
      localStorage.getItem('access_token')?.toString().trim() != null) {
        this.router.navigate(['home']);
      }
  }

}

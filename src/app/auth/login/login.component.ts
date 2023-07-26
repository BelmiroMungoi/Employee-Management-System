import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestPayload } from '../../model/login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginRequest!: LoginRequestPayload
  registerSucessMessage!: string;  
  showMessage = false;

  constructor(private loginService: LoginService, private router: Router,
    private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
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
        localStorage.setItem("access_token", data.access_token);
        this.router.navigate(['home'])
        this.toastr.success("Bem-vindo ao sistema");
        console.log(data);
      },
        error => {
          this.toastr.error("Email ou Palavra-Passe estão incorretos!");
          console.error("Erro ao fazer login " + error);
        });
    } else {
      this.toastr.warning('Por favor insira dados válidos!')
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

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['registered'] !== undefined && params['registered'] === 'true') {
        this.toastr.success("Usuário registrado com Sucesso");
        this.showMessage = true;
        this.registerSucessMessage = 'Mandamos um link para verificar o seu email!' + 
        ' Por favor verique o seu email para activar a sua conta!';
      }
    })
  }

}

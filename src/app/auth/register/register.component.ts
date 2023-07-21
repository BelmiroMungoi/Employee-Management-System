import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequestPayload } from 'src/app/model/register-request.payload';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerRequest!: RegisterRequestPayload;

  constructor(private registerService: RegisterService, private router: Router, private toastr: ToastrService) {
    this.registerRequest = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    };
  }

  doRegister() {
    if (this.registerForm.valid) {
      this.registerRequest.firstname = this.registerForm.get('firstname')?.value;
      this.registerRequest.lastname = this.registerForm.get('lastname')?.value;
      this.registerRequest.email = this.registerForm.get('email')?.value;
      this.registerRequest.password = this.registerForm.get('password')?.value;

      this.registerService.register(this.registerRequest).subscribe(data => {
        console.info(data);
        this.router.navigate(['/login'],
        {
          queryParams: {
            registered: 'true'
          }
        });
      }, error => {
        this.toastr.error('Registro falhou, Por favor Tente Novamente')
      }
      )
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

}

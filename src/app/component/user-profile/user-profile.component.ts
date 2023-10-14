import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ChangePasswordRequest } from 'src/app/model/changePassword-request.payload';
import { RegisterRequestPayload } from 'src/app/model/register-request.payload';
import { ImageService } from 'src/app/service/image.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId!: any;
  firstname!: any;
  lastname!: any;
  email!: any;
  enabled!: any;
  role!: any;
  selectedFile!: File;
  base64Data!: any;
  retrieveResponse!: any;
  url = "";
  userForm!: FormGroup;
  userRequest!: RegisterRequestPayload;
  changePasswordForm!: FormGroup;
  changePasswordRequest!: ChangePasswordRequest;


  constructor(private imageService: ImageService, private toastr: ToastrService,
    private userService: UserService, private app: AppComponent) {
    this.userRequest = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    },
      this.changePasswordRequest = {
        currentPassword: '',
        newPassword: '',
        confirmationPassword: ''
      }
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.showImage();
    this.fillForm();
    this.userForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmationPassword: new FormControl('', Validators.required)
    })
  }

  public getUserDetails() {
    this.userService.getUserById().subscribe(response => {
      this.userId = response.userId;
      this.firstname = response.firstname;
      this.lastname = response.lastname;
      this.email = response.email;
      this.enabled = response.enabled;
      this.role = response.role;
    })
  }

  public onSelectedFile(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files) {
      var fileReader = new FileReader();
      fileReader.readAsDataURL(this.selectedFile);
      fileReader.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
  }

  public onUpload() {
    var formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.imageService.uploadImage(formData).subscribe(data => {
      this.toastr.success(data.body);
      this.app.showImage();
    }, error => {
      this.toastr.error('Ocorreu um erro ao salvar imagem!');
      console.error(error.message);
    })
  }

  public getImage() {
    this.imageService.downloadImage().subscribe(response => {
      this.retrieveResponse = response;
      this.base64Data = this.retrieveResponse.image;
      this.url = 'data:' + this.retrieveResponse.fileType + ';base64,' + this.base64Data;
    })
  }

  public showImage() {
    if (this.getImage() == null) {
      this.url = "./assets/img/default-profile.png";
    } else {
      this.getImage();
    }
  }

  public deleteImage() {
    this.imageService.deleteImage().subscribe(response => {
      this.toastr.success(response);
      this.showImage();
      this.app.showImage();
    }, error => {
      this.toastr.error('Ocorreu um erro ao eliminar imagem!');
    })
  }

  public updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.mapToRequest()).subscribe(response => {
        this.toastr.success(response.responseMessage);
        this.getUserDetails();
        this.app.getUserDetails();
      }, error => {
        this.toastr.error('Ocorreu um erro ao actualizar usúario! Tente Novamente!')
      })
    } else {
      this.toastr.warning('Preencha devidamente o formulário!');
    }
  }

  public changePassword() {
    if (this.changePasswordForm.valid) {
      if (this.mapChangePasswordToRequest().newPassword != this.mapChangePasswordToRequest().confirmationPassword) {
        this.toastr.error('As palavras-passe não coincidem');
        this.changePasswordForm.get('newPassword')?.setErrors(this.changePasswordForm);
        this.changePasswordForm.get('confirmationPassword')?.setErrors(this.changePasswordForm);
      } else {
        this.userService.changePassword(this.mapChangePasswordToRequest()).subscribe(response => {
          this.toastr.success(response.responseMessage);
          this.cleanForm();
        }, error => {
          this.toastr.error('Palavra-passe Inválida');
          this.changePasswordForm.get('currentPassword')?.setErrors(this.changePasswordForm);
          console.error(error);
        })
      }
    } else {
      this.toastr.warning('Preencha devidamente o formulário!');
    }
  }

  public fillForm() {
    this.userService.getUserById().subscribe(response => {
      this.userForm = new FormGroup({
        id: new FormControl({ value: response.userId, disabled: true }),
        firstname: new FormControl(response.firstname, Validators.required),
        lastname: new FormControl(response.lastname, Validators.required),
        email: new FormControl(response.email, Validators.required)
      });
    })
  }

  public cleanForm() {
    this.changePasswordForm.reset();
  }

  public mapToRequest(): RegisterRequestPayload {
    this.userRequest.firstname = this.userForm.get('firstname')?.value;
    this.userRequest.lastname = this.userForm.get('lastname')?.value;
    this.userRequest.email = this.userForm.get('email')?.value;
    return this.userRequest;
  }

  public mapChangePasswordToRequest(): ChangePasswordRequest {
    this.changePasswordRequest.currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    this.changePasswordRequest.newPassword = this.changePasswordForm.get('newPassword')?.value;
    this.changePasswordRequest.confirmationPassword = this.changePasswordForm.get('confirmationPassword')?.value;
    return this.changePasswordRequest;
  }
}

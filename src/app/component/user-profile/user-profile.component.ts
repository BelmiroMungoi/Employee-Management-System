import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterRequestPayload } from 'src/app/model/register-request.payload';
import { ImageService } from 'src/app/service/image.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  
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


  constructor(private imageService: ImageService, private toastr: ToastrService, 
    private userService: UserService) {
      this.userRequest = {
        firstname: '',
        lastname: '',
        email: '',
        password: ''
      }
    }

  ngOnInit(): void {
    this.getUserDetails();
    this.showImage();
    this.fillForm();
  }

  public getUserDetails() {
    this.userId = localStorage.getItem('userId');
    this.firstname = localStorage.getItem('firstname'); 
    this.lastname = localStorage.getItem('lastname');
    this.email = localStorage.getItem('email');
    this.enabled = localStorage.getItem('enabled');
    this.role = localStorage.getItem('role');
  }

  public onSelectedFile(event: any) {
    this.selectedFile = <File> event.target.files[0];
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
      this.toastr.success('Imagem foi salva com sucesso!');
      console.info(data);
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

  public updateUser() {
    this.userService.updateUser(this.mapToRequest()).subscribe(response => {
      this.toastr.success(response.responseMessage);
    }, error => {
      console.error(error.message);
    })
  }

  public fillForm() {
    this.userForm = new FormGroup({
      id: new FormControl({value: this.userId, disabled: true}),
      firstname: new FormControl(this.firstname, Validators.required),
      lastname: new FormControl(this.lastname, Validators.required),
      email: new FormControl(this.email, Validators.required)
    });
  }

  public mapToRequest(): RegisterRequestPayload {
    this.userRequest.firstname = this.userForm.get('firstname')?.value;
    this.userRequest.lastname = this.userForm.get('lastname')?.value;
    this.userRequest.email = this.userForm.get('email')?.value;
    return this.userRequest;
  }
 
}

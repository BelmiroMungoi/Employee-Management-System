import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule} from 'ngx-toastr'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptorModule } from './service/header-interceptor.service';
import { EmployeeComponent } from './component/employee/employee.component';
import { DeparmentComponent } from './component/deparment/deparment.component';
import { MissionComponent } from './component/mission/mission.component';
import { EmployeeAddComponent } from './component/employee-add/employee-add.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeComponent,
    DeparmentComponent,
    MissionComponent,
    EmployeeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HeaderInterceptorModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule, 
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

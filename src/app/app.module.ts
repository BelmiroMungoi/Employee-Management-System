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
import { DepartmentComponent } from './component/department/department.component';
import { MissionComponent } from './component/mission/mission.component';
import { EmployeeAddComponent } from './component/employee-add/employee-add.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeReportComponent } from './component/employee-report/employee-report.component';
import { DepartmentReportComponent } from './component/department-report/department-report.component';
import { MissionReportComponent } from './component/mission-report/mission-report.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeProfileComponent } from './component/employee-profile/employee-profile.component';
import { DepartmentDetailsComponent } from './component/department-details/department-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EmployeeComponent,
    DepartmentComponent,
    MissionComponent,
    EmployeeAddComponent,
    EmployeeReportComponent,
    DepartmentReportComponent,
    MissionReportComponent,
    UserProfileComponent,
    EmployeeProfileComponent,
    DepartmentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HeaderInterceptorModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule, 
    BrowserAnimationsModule,
    NgxPaginationModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

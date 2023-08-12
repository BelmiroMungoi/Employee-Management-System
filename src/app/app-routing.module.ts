import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { DepartmentComponent } from './component/department/department.component';
import { MissionComponent } from './component/mission/mission.component';
import { EmployeeAddComponent } from './component/employee-add/employee-add.component';
import { GuardianGuard } from './service/guardian.guard';
import { EmployeeReportComponent } from './component/employee-report/employee-report.component';
import { DepartmentReportComponent } from './component/department-report/department-report.component';
import { MissionReportComponent } from './component/mission-report/mission-report.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [GuardianGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [GuardianGuard] },
  { path: 'employeeAdd', component: EmployeeAddComponent, canActivate: [GuardianGuard] },
  { path: 'employeeAdd/:id', component: EmployeeAddComponent, canActivate: [GuardianGuard] },
  { path: 'department', component: DepartmentComponent, canActivate: [GuardianGuard] },
  { path: 'mission', component: MissionComponent, canActivate: [GuardianGuard] },
  { path: 'employeeReport', component: EmployeeReportComponent, canActivate: [GuardianGuard] },
  { path: 'departmentReport', component: DepartmentReportComponent, canActivate: [GuardianGuard] },
  { path: 'missionReport', component: MissionReportComponent, canActivate: [GuardianGuard] },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [GuardianGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { DeparmentComponent } from './component/deparment/deparment.component';
import { MissionComponent } from './component/mission/mission.component';
import { EmployeeAddComponent } from './component/employee-add/employee-add.component';
import { GuardianGuard } from './service/guardian.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardianGuard] }, 
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'employee', component: EmployeeComponent, canActivate: [GuardianGuard] },
  { path: 'employeeAdd', component: EmployeeAddComponent, canActivate: [GuardianGuard] },
  { path: 'department', component: DeparmentComponent, canActivate: [GuardianGuard] },
  { path: 'mission', component: MissionComponent, canActivate: [GuardianGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

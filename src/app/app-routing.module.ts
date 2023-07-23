import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { DeparmentComponent } from './component/deparment/deparment.component';
import { MissionComponent } from './component/mission/mission.component';
import { EmployeeAddComponent } from './component/employee-add/employee-add.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'employee', component: EmployeeComponent},
  { path: 'employeeAdd', component: EmployeeAddComponent},
  { path: 'department', component: DeparmentComponent},
  { path: 'mission', component: MissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

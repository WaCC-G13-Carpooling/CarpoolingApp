import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'employee-home/:id', component: HomeEmployeeComponent},
    { path: 'company-home/:id', component: HomeCompanyComponent},
    { path: 'employee-register', component: EmployeeRegisterComponent},
    { path: 'company-register', component: CompanyRegisterComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

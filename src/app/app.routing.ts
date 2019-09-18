import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { HomeEmployeeComponent } from './home-employee/home-employee.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { CompanyRegisterComponent } from './company-register/company-register.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'employee-home', component: HomeEmployeeComponent},
    { path: 'company-home', component: HomeCompanyComponent},
    { path: 'employee-register', component: EmployeeRegisterComponent},
    { path: 'company-register', component: CompanyRegisterComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);

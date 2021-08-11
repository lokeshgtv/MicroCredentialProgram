import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { LoanComponent } from './loan/loan.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

const appRoutes: Routes = [
{ path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'userDetail', component: UserdetailComponent, 
    children : [
        { path: ':id', component: CustomerRegistrationComponent,},        
        { path: ':id/loan', component: LoanComponent,},        
    ] },
//{ path: 'userDetail/:id', component: UserdetailComponent}    
]

@NgModule(
    {
        imports:[ RouterModule.forRoot(appRoutes) ],
        exports: [RouterModule]
    }
)
export class AppRoutingModule
{

}
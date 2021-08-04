import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import { HttpClient } from '@angular/common/http'; 
import { DropDownDataService } from './Service/DropdownDataService.Model';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { LoanComponent } from './loan/loan.component';
import { LoginComponent } from './login/login.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './Service/UserService.Service';


@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    LoanComponent,
    LoginComponent,
    UserdetailComponent    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [   HttpClient, DropDownDataService, DatePipe, UserService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

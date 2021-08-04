import { IUserService } from './UserService.Interface';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../Model/User.Model';
import { Injectable } from '@angular/core';
import { BankAccountDetails } from '../Model/BankAccountDetails.Model';

@Injectable()
export class UserService
{
    constructor(){}
    IsValidUser(uName: string, pwd: string) : Observable<string>
    {
        if(uName === 'admin' && pwd === 'admin')
        {           
            return of('123456');
        }
        return of("");
    }
    GetUserDetailByCustId(custId: string) : Observable<User>
    {
        return of(this.GetDummyData());
    }
    UpdateUserDetail(userDetail: User) : Observable<boolean>
    {
        return of(true);
    }
    AddUserDetail(userDetail: User) : Observable<string>
    {
        console.log("User Details added :", userDetail);        
        return of("Cust123456");
    }

    GetDummyData() : User
    {
        let bankAccountDetailModel = new BankAccountDetails(
        {  
            customerId: 'Cust12345' ,
            Name: 'Lokesh',
            accountNumber: '987654321',
            accountType: 'Savings',
            bankName: 'Indian Bank',
            branchName: 'Anna Nagar',
            citizenStatus: 'Normal',
            initialDepositAmount: 5000,
            identificationProofType: 'Aadhar',
            identificationDocumentNumer: '111111111',
            referenceAccountHolderName: 'Gopi',
            referenceAccountHolderAddress: 'Chennai',
            accountActivationDate : new Date()
            
        });
        let userModel = new User(
        {
            id : 'Cust12345',
            name: 'Lokesh',
            userNmae: 'Lokeshgtv',
            password: '123456789',
            guardianType: 'Father',
            guardianName: 'Gopi',
            address: 'Ambattur',
            citizenship: 'Indian',
            state: 'Tamil Nadu',
            country: 'India',
            EmailAddress: 'lokeshgtv@gmail.com',
            gender: 'Male',
            maritalStatus : 'Married',
            contactNo : 9841550550,
            dob: new Date(1984, 12, 6),
            registrationDate: new Date().toString(),
            accountType: 'Savings',
            bankAccountDetail: bankAccountDetailModel
        });
        return userModel;
    }
}
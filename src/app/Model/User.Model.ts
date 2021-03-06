import { UserConstants } from "../Constants/User.Contants";
import { BankAccountDetails } from "./BankAccountDetails.Model";
import { LoanAccountDetails } from "./LoanAccountDetails.Model";

export class User
{
    id: string;
    name: string;
    userNmae: string;
    password: string;
    guardianType: string;
    guardianName: string;
    address: string;
    citizenship: string;
    state: string;
    country: string;
    EmailAddress: string;
    gender: string;
    maritalStatus : string;
    contactNo : Number;
    dob: Date;
    registrationDate: string;
    accountType: string;
    bankAccountDetail : BankAccountDetails; 
    loanAccountDetail : LoanAccountDetails;  
    
    constructor(init?: Partial<User>)
    {
        Object.assign(this, init);
    }
}

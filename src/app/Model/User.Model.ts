import { UserConstants } from "../Constants/User.Contants";
import { Gender } from "../Constants/User.Contants";
import { BankAccountDetails } from "./BankAccountDetails.Model";

export class User
{
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
    gender: Gender
    maritalStatus : string;
    contactNo : Number;
    dob: Date;
    registrationDate: Date;
    accountType: string;
    bankAccountDetail : BankAccountDetails;   
}

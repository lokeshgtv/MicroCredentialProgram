import {} from "./User.Model"
import { UserConstants } from "../Constants/User.Contants"
import { User } from "./User.Model"
export class BankAccountDetails
{
    customerId: string;
    Name: string;
    accountNumber: string;
    accountType: string;
    bankName: string;
    branchName: string;
    citizenStatus: boolean;
    initialDepositAmount: number;
    identificationProofType: string;
    identificationDocumentNumer: string;
    referenceAccountHolderName: string; 
    referenceAccountHolderNumber: string; 
    referenceAccountHolderAddress: string; 
    UserDetail : User;
    accountActivationDate: Date;
}
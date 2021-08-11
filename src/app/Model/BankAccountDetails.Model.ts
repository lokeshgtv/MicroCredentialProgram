import {} from "./User.Model"
import { UserConstants } from "../Constants/User.Contants"
import { User } from "./User.Model"
import { LoanAccountDetails } from './LoanAccountDetails.Model';
export class BankAccountDetails
{
    customerId: string;
    Name: string;
    accountNumber: string;
    accountType: string;
    bankName: string;
    branchName: string;
    citizenStatus: string;
    initialDepositAmount: number;
    identificationProofType: string;
    identificationDocumentNumer: string;
    referenceAccountHolderName: string; 
    referenceAccountHolderNumber: string; 
    referenceAccountHolderAddress: string;     
    accountActivationDate: Date;
    loanDetail: LoanAccountDetails;

    constructor(init?: Partial<BankAccountDetails>)
    {
        Object.assign(this, init);
    }
}
import { EducationLoanAccountDetails } from "./EducationLoanAccountDetails.Model";
import { NonEducationLoanAccountDetails } from "./NonEducationLoanAccountDetails.Model";
export class LoanAccountDetails
{ 
    loanType: string;
    loanAmount: number;
    loanApplyDate: Date;
    loanIssueDate: Date;
    rateofInterest: Number;
    duration: Number;   
    educationLoanAccountDetail: EducationLoanAccountDetails;
    otherLoanAccountDetail: NonEducationLoanAccountDetails;
}
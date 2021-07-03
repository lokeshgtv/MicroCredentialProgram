
export enum Gender{
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export class UserConstants
{

    MaritalStatus: string[] = ["Married", "Single" , "Divorced" , "Other"];
    AccountType: string[] = ["Savings", "Salary"];
    IdentificationProofType: string[] = ["Aadhar", "Driving License", "Pan Card"];
    LoanTypes: string[] = [ "Education", "Personal", "Housing" ]
    citizenStatus: string[] = ["Minor", "Normal", "Senior"]
    EducationLoanROI = 5;
    PersonalLoanROI = 13;
    HousingLoanROI = 7;
    MinimumSavingsAccountBalance = 5000;
    MinimumSalaryAccountBalance = 0;
}
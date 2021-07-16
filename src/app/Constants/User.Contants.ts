
export class UserConstants
{
    constructor()
    {
        
    }

    MaritalStatus: string[] = ["Married", "Single" , "Divorced" , "Other"];
    Gender: string[] = ["Male", "Female", "Other"]
    AccountType: string[] = ["Savings", "Salary"];
    IdentificationProofType: string[] = ["Aadhar", "Driving License", "Pan Card"];
    LoanTypes: string[] = [ "Education", "Personal", "Housing" ]
    citizenStatus: string[] = ["Minor", "Normal", "Senior"]
    EducationLoanROI = 5;
    PersonalLoanROI = 13;
    HousingLoanROI = 7;
    MinimumSavingsAccountBalance = 5000;
    MinimumSalaryAccountBalance = 0;
    States : string[] = ["Andhra Pradesh", "Andaman and Nicobar Island", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadar and Nagar Haveli",
    "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"];
}

export class CountryModel
{
    id: string;
    sortname; string;
    name: string;
    phonecode: string;
}
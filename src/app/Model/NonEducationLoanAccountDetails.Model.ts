export class NonEducationLoanAccountDetails
{
   annualIncome: number;
   companyName: string;
   designation: string;
   totalExperience: number;
   currentExperience: number;

   constructor(init?: Partial<NonEducationLoanAccountDetails>)
    {
        Object.assign(this, init);
    }
}
export class EducationLoanAccountDetails
{
    courseFee: Number;
    course: string;
    fatherName: string;
    fatherOccupation: string;
    fatherTotalExperience: number;
    fatherCurrentExperience: number
    rationCardNo: number;
    annualIncome: number;

    constructor(init?: Partial<EducationLoanAccountDetails>)
    {
        Object.assign(this, init);
    }
}
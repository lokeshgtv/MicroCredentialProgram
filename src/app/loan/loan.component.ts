import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { UserConstants } from '../Constants/User.Contants';
import { User } from '../Model/User.Model';
import * as moment from 'moment';
import { MinimimDateValidator } from '../Validators/CustomValidators'
import { UserService } from '../Service/UserService.Service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoanAccountDetails } from '../Model/LoanAccountDetails.Model';
import { EducationLoanAccountDetails } from '../Model/EducationLoanAccountDetails.Model';
import { NonEducationLoanAccountDetails } from '../Model/NonEducationLoanAccountDetails.Model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  IsLoanRegistration : boolean = true;
  accNumber: string;
  IsFormGroupEditable: boolean = true;

  loanFormControl : FormGroup;
  educationLoanFormControl: FormGroup;
  personalLoanFormControl: FormGroup;
  housingLoanFormControl: FormGroup;

  accHolderNameControl : FormControl;
  loanType : FormControl;
  loanAmount: FormControl;
  loanApplyDate: FormControl;
  loanIssueDate: FormControl;
  rateofInterest: FormControl;
  duration: FormControl;

  courseFee : FormControl;
  course : FormControl;
  fatherName : FormControl;
  fatherOccupation : FormControl;
  fatherTotalExperience : FormControl;
  fatherCurrentExperience: FormControl;
  rationCardNo : FormControl;
  annualIncome : FormControl;

  companyName :  FormControl;
  designation :  FormControl;
  totalExperience : FormControl;
  currentExperience :  FormControl;

  homeLoanannualIncome : FormControl;
  homeLoancompanyName :  FormControl;
  homeLoandesignation :  FormControl;
  homeLoantotalExperience :  FormControl;
  homeLoancurrentExperience :  FormControl;


  loanTypes : any[];
  loanDuration: any[];
  userContantsModel : UserConstants;
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  

  constructor(private userService : UserService, private route: ActivatedRoute,
    private router: Router) {
    
    this.userContantsModel = new UserConstants();
    this.loanTypes = this.userContantsModel.LoanTypes;
    this.loanDuration = this.userContantsModel.LoanDuration;
    

    this.accHolderNameControl = new FormControl({value : '', disabled: true}, [Validators.required]),
    this.loanType = new FormControl('', [Validators.required]);
    this.loanAmount = new FormControl('', [Validators.required]);
    this.loanApplyDate  = new FormControl('', [Validators.required, MinimimDateValidator(new Date())]);
    this.loanIssueDate = new FormControl({value : '', disabled: true}, [Validators.required]);
    this.rateofInterest = new FormControl({value : '', disabled: true}, [Validators.required]);
    this.duration = new FormControl('', [Validators.required]);

    this.courseFee = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this.course = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this.fatherName = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this.fatherOccupation = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this.fatherTotalExperience = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this.fatherCurrentExperience = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this. rationCardNo = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);
    this.annualIncome = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Education'),
      Validators.required
    )]);

    this.annualIncome = new FormControl('',  [this.conditionalValidator(
      (() => this.loanType.value === 'Personal'),
      Validators.required
    )]);
    this.companyName = new FormControl('',[this.conditionalValidator(
      (() => this.loanType.value === 'Personal'),
      Validators.required
    )]);
    this.designation = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Personal'),
      Validators.required
    )]);
    this.totalExperience = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Personal'),
      Validators.required
    )]);
    this.currentExperience = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Personal'),
      Validators.required
    )]);

    this.homeLoanannualIncome = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoancompanyName = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoandesignation = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoantotalExperience = new FormControl('',[this.conditionalValidator(
      (() => this.loanType.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoancurrentExperience = new FormControl('', [this.conditionalValidator(
      (() => this.loanType.value === 'Housing'),
      Validators.required
    )]);
    
    this.loanFormControl = new FormGroup(
    {
      accHolderNameControl : this.accHolderNameControl,
      loanType : this.loanType,
      loanAmount:  this.loanAmount,
      loanApplyDate: this.loanApplyDate,
      loanIssueDate: this.loanIssueDate,
      rateofInterest: this.rateofInterest,
      duration: this.duration,
    });

    this.educationLoanFormControl = new FormGroup(
    {
        courseFee : this.courseFee,
        course : this.course,
        fatherName : this.fatherName,
        fatherOccupation : this.fatherOccupation,
        fatherTotalExperience : this.fatherTotalExperience,
        fatherCurrentExperience : this.fatherCurrentExperience,
        rationCardNo : this.rationCardNo,
        annualIncome : this.annualIncome,
    });

    this.personalLoanFormControl = new FormGroup(
    {
      annualIncome : this.annualIncome, 
      companyName : this.companyName,
      designation : this.designation,
      totalExperience : this.totalExperience,
      currentExperience : this.currentExperience,
    })

    this.housingLoanFormControl = new FormGroup(
    {
      annualIncome : this.annualIncome, 
      companyName : this.companyName,
      designation : this.designation,
      totalExperience : this.totalExperience,
      currentExperience : this.currentExperience,
    })
    

   }

  ngOnInit(): void {  
    
    let loanTypeValue = this.loanType.value;
    if(loanTypeValue !== '')
    {
      this.setValidatorForFormControls(loanTypeValue);
      this.onLoanTypeChange(loanTypeValue);
    }

    this.route.queryParams
        .subscribe(
          (queryParams: Params) => {
            this.accNumber = queryParams['accId'];
            console.log("Editable Status : ", this.accNumber); 
            console.log("Form Group Editable Status1 : ", this.IsFormGroupEditable);    
            this.userService.GetUserDetailByCustId(this.accNumber)
            .subscribe((userData) =>
            {
            
              this.SetFormValues(userData);     
                     
            })                         
          }
        );

  }

  SetFormValues(user: User)
    {         
        if(user.bankAccountDetail.loanDetail == null )
        {
          console.log("Loan Data: ", user.name);
          this.loanFormControl.get('accHolderNameControl').patchValue(user.name);          
        }
        else
        {
          let loanDetailInfo = user.bankAccountDetail.loanDetail;
          let loanForm = {
            accHolderNameControl : user.name,
            loanType: loanDetailInfo.loanType,
            loanAmount: loanDetailInfo.loanAmount,
            loanApplyDate: loanDetailInfo.loanApplyDate,
            loanIssueDate: loanDetailInfo.loanIssueDate,
            rateofInterest: loanDetailInfo.rateofInterest,
            duration: loanDetailInfo.duration,
          };
          let educationLoanDetailInfo = loanDetailInfo.educationLoanAccountDetail;
          let educationLoanForm = {
            courseFee: educationLoanDetailInfo.courseFee,
            course: educationLoanDetailInfo.course,
            fatherName: educationLoanDetailInfo.fatherName,
            fatherOccupation: educationLoanDetailInfo.fatherOccupation,
            fatherTotalExperience: educationLoanDetailInfo.fatherTotalExperience,
            fatherCurrentExperience: educationLoanDetailInfo.fatherCurrentExperience,
            rationCardNo: educationLoanDetailInfo.rationCardNo,
            annualIncome: educationLoanDetailInfo.annualIncome,

          }
          let otherLoanDetailInfo = loanDetailInfo.otherLoanAccountDetail;
          let OtherLoanForm = {          
            annualIncome: otherLoanDetailInfo.annualIncome,
            companyName: otherLoanDetailInfo.companyName,
            designation: otherLoanDetailInfo.designation,
            totalExperience: otherLoanDetailInfo.totalExperience,
            currentExperience: otherLoanDetailInfo.currentExperience
          }
        
          this.loanFormControl.setValue(loanForm);
          if(loanDetailInfo.loanType != '')
          {
            if(loanDetailInfo.loanType === 'Education')
            {
              this.educationLoanFormControl.setValue(educationLoanForm);
            }
            else if(loanDetailInfo.loanType === 'Personal')
            {
              this.personalLoanFormControl.setValue(OtherLoanForm);
            }
            else
            {
              this.housingLoanFormControl.setValue(OtherLoanForm);
            }        
          }
      }
  }

   
  onLoanTypeChange(loanTypeSelected : string)
  {
    let roi: number;
    
    if(loanTypeSelected === 'Education') 
    {
      roi = this.userContantsModel.EducationLoanROI;      

    }
    else if(loanTypeSelected === 'Personal') 
    {
      roi = this.userContantsModel.PersonalLoanROI;
    }
    else
    { 
      roi = this.userContantsModel.HousingLoanROI;
    }
    this.loanFormControl.get('rateofInterest').patchValue(roi);    
    this.setValidatorForFormControls(loanTypeSelected);
  }

  onLoanApplyDateChange(selectedDate: Date)
  {
    this.loanFormControl.get('loanIssueDate').patchValue(moment(selectedDate).format("DD-MM-YYYY"));    
  }

   conditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {    
      console.log("Validator Called For ", control)  
      control.setValidators([validator]);
      if (! condition()) {
        control.clearValidators();
        return null;
      }
      else
      {        
        return validator(control);
      }
    }

  }

  setValidatorForFormControls(value: string)
  {     
    console.log("Set Value :", value);
     Object.keys(this.educationLoanFormControl.controls).forEach(key => {
      if(value !== 'Education')
      {
        this.educationLoanFormControl.get(key).clearValidators();
      }
      else
      {
        this.educationLoanFormControl.get(key).setValidators([Validators.required]);
      }
    });
    Object.keys(this.personalLoanFormControl.controls).forEach(key => {
      console.log("Personal Loan Type Keys : ", key)
      if(value !== 'Personal')
      {
        console.log("Personal Loan Type Validators disabled");
        this.personalLoanFormControl.get(key).clearValidators();
      }
      else
      {
        console.log("Personal Loan Type Validators enabled");
        this.personalLoanFormControl.get(key).setValidators([Validators.required]);
      }
    });
    Object.keys(this.housingLoanFormControl.controls).forEach(key => {
      if(value !== 'Housing')
      {
        this.housingLoanFormControl.get(key).clearValidators();
      }
      else
      {
        this.housingLoanFormControl.get(key).setValidators([Validators.required]);
      }
    });
  }

  onLoanDetailSubmitted()
  {
    console.log("Loan details Submitted");
  }

}

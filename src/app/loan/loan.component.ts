import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { UserConstants } from '../Constants/User.Contants';
import { User } from '../Model/User.Model';
import * as moment from 'moment';
import { MinimimDateValidator } from '../Validators/CustomValidators'

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  IsLoanRegistration : boolean = true;
  loanFormControl : FormGroup;
  educationLoanFormControl: FormGroup;
  personalLoanFormControl: FormGroup;
  housingLoanFormControl: FormGroup;

  accHolderNameControl : FormControl;
  loanTypeControl : FormControl;
  loanAmountControl: FormControl;
  loanApplyDateControl: FormControl;
  loanIssueDateControl: FormControl;
  rateOfInterestControl: FormControl;
  durationofLoanControl: FormControl;

  courseFeeControl : FormControl;
  courseNameControl : FormControl;
  fatherNameControl : FormControl;
  fatherOccupationControl : FormControl;
  fatherTotalExpControl : FormControl;
  fatherCurrentExpControl: FormControl;
  rationCardNoControl : FormControl;
  annualIncomeControl : FormControl;

  annualIncomeSelfControl : FormControl;
  compnayNameControl :  FormControl;
  designationControl :  FormControl;
  totalExpSelfControl : FormControl;
  currentExpSelfControl :  FormControl;

  homeLoanAnnualIncomeSelfControl : FormControl;
  homeLoanCompnayNameControl :  FormControl;
  homeLoanDesignationControl :  FormControl;
  homeLoanTotalExpSelfControl :  FormControl;
  homeLoanCurrentExpSelfControl :  FormControl;


  loanTypes : any[];
  loanDuration: any[];
  userContantsModel : UserConstants;
  minDate =  moment(new Date()).format('YYYY-MM-DD');
  

  constructor() {
    
    this.userContantsModel = new UserConstants();
    this.loanTypes = this.userContantsModel.LoanTypes;
    this.loanDuration = this.userContantsModel.LoanDuration;
    

    this.accHolderNameControl = new FormControl({value : '', disabled: true}, [Validators.required]),
    this.loanTypeControl = new FormControl('', [Validators.required]);
    this.loanAmountControl = new FormControl('', [Validators.required]);
    this.loanApplyDateControl  = new FormControl('', [Validators.required, MinimimDateValidator(new Date())]);
    this.loanIssueDateControl = new FormControl({value : '', disabled: true}, [Validators.required]);
    this.rateOfInterestControl = new FormControl({value : '', disabled: true}, [Validators.required]);
    this.durationofLoanControl = new FormControl('', [Validators.required]);

    this.courseFeeControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this.courseNameControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this.fatherNameControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this.fatherOccupationControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this.fatherTotalExpControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this.fatherCurrentExpControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this. rationCardNoControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);
    this.annualIncomeControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Education'),
      Validators.required
    )]);

    this.annualIncomeSelfControl = new FormControl('',  [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Personal'),
      Validators.required
    )]);
    this.compnayNameControl = new FormControl('',[this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Personal'),
      Validators.required
    )]);
    this.designationControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Personal'),
      Validators.required
    )]);
    this.totalExpSelfControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Personal'),
      Validators.required
    )]);
    this.currentExpSelfControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Personal'),
      Validators.required
    )]);

    this.homeLoanAnnualIncomeSelfControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoanCompnayNameControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoanDesignationControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoanTotalExpSelfControl = new FormControl('',[this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Housing'),
      Validators.required
    )]);
    this.homeLoanCurrentExpSelfControl = new FormControl('', [this.conditionalValidator(
      (() => this.loanTypeControl.value === 'Housing'),
      Validators.required
    )]);
    
    this.loanFormControl = new FormGroup(
    {
      accHolderNameControl : this.accHolderNameControl,
      loanTypeControl : this.loanTypeControl,
      loanAmountControl:  this.loanAmountControl,
      loanApplyDateControl: this.loanApplyDateControl,
      loanIssueDateControl: this.loanIssueDateControl,
      rateOfInterestControl: this.rateOfInterestControl,
      durationofLoanControl: this.durationofLoanControl,
    });

    this.educationLoanFormControl = new FormGroup(
    {
        courseFeeControl : this.courseFeeControl,
        courseNameControl : this.courseNameControl,
        fatherNameControl : this.fatherNameControl,
        fatherOccupationControl : this.fatherOccupationControl,
        fatherTotalExpControl : this.fatherTotalExpControl,
        fatherCurrentExpControl : this.fatherCurrentExpControl,
        rationCardNoControl : this.rationCardNoControl,
        annualIncomeControl : this.annualIncomeControl,
    });

    this.personalLoanFormControl = new FormGroup(
    {
      annualIncomeSelfControl : this.annualIncomeSelfControl, 
      compnayNameControl : this.compnayNameControl,
      designationControl : this.designationControl,
      totalExpSelfControl : this.totalExpSelfControl,
      currentExpSelfControl : this.currentExpSelfControl,
    })

    this.housingLoanFormControl = new FormGroup(
    {
        homeLoanAnnualIncomeSelfControl : this.homeLoanAnnualIncomeSelfControl,
        homeLoanCompnayNameControl : this.homeLoanCompnayNameControl,
        homeLoanDesignationControl : this.homeLoanDesignationControl,
        homeLoanTotalExpSelfControl : this.homeLoanTotalExpSelfControl,
        homeLoanCurrentExpSelfControl : this.homeLoanCurrentExpSelfControl,
    })
    

   }

  ngOnInit(): void {  
    
    let loanTypeValue = this.loanTypeControl.value;
    if(loanTypeValue !== '')
    {
      this.setValidatorForFormControls(loanTypeValue);
      this.onLoanTypeChange(loanTypeValue);
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
    this.loanFormControl.get('rateOfInterestControl').patchValue(roi);    
    this.setValidatorForFormControls(loanTypeSelected);
  }

  onLoanApplyDateChange(selectedDate: Date)
  {
    this.loanFormControl.get('loanIssueDateControl').patchValue(moment(selectedDate).format("DD-MM-YYYY"));    
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

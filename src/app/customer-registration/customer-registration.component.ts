import { Component, OnInit, Predicate } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators, NG_VALIDATORS, ValidatorFn, Form } from '@angular/forms';
import { User } from '../Model/User.Model';
import {Country, State, City} from 'country-state-city';
import { DropDownDataService  } from '../Service/DropdownDataService.Model'
import { Observable } from 'rxjs';
import { UserConstants } from '../Constants/User.Contants';
import { DatePipe } from '@angular/common';
import { BankAccountDetails } from '../Model/BankAccountDetails.Model';
import { formatDate } from '@angular/common'
import * as moment from 'moment';


import { DOBAgeValidatorForBankAccountOpening } from '../Validators/CustomValidators'

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
   
  countriesModel : any[];
  stateModel : any[];
  statesForSelectedCountry: any[];  
  GenderModel:string[];
  MaritalStatusModel:string[];
  AccountTypeModel:string[]
  IdentificationProofTypeModel:string[];
  userModel:User = new User();  
  customerRegistrationControl: FormGroup;
  nameControl: FormControl;
  userNmaeControl: FormControl;
  passwordControl: FormControl;
  guardianTypeControl: FormControl;
  guardianNameControl: FormControl;
  addressControl: FormControl;
  citizenshipControl: FormControl;
  stateControl: FormControl;
  countryControl: FormControl;
  EmailAddressControl: FormControl;
  genderControl: FormControl
  maritalStatusControl : FormControl;
  contactNoControl : FormControl;
  dobControl: FormControl;
  registrationDate: FormControl;
  accountTypeControl: FormControl;
  branchNameControl: FormControl;
  citizenStatusControl: FormControl;
  initialDepositAmountControl: FormControl;
  idProofTypeControl: FormControl;
  identificationDocumentNoControl: FormControl;
  refAccHolderNameControl: FormControl;
  refAccHolderNumberControl: FormControl;
  refAccHolderAddressControl: FormControl;
  maxDate: string;

  tempDate: Date;

    constructor(private service: DropDownDataService, public datePipe: DatePipe)
    {      
      this.userModel.bankAccountDetail = new BankAccountDetails();
      this.GenderModel = new UserConstants().Gender;
      this.MaritalStatusModel = new UserConstants().MaritalStatus;
      this.AccountTypeModel = new UserConstants().AccountType;
      this.IdentificationProofTypeModel = new UserConstants().IdentificationProofType;
      this.nameControl = new FormControl(this.userModel.name, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]);
      this.idProofTypeControl = new FormControl(this.userModel.bankAccountDetail.identificationProofType, [Validators.required]); 
      let regDateData:string =  moment(new Date()).format('YYYY-MM-DD');
      this.maxDate = moment(new Date()).format('YYYY-MM-DD');
      this.dobControl = new FormControl(this.userModel.dob, [Validators.required, DOBAgeValidatorForBankAccountOpening()]),
      this.registrationDate = new FormControl({value:  moment(new Date()).format('YYYY-MM-DD'), disabled: true}); 
      this.citizenStatusControl = new FormControl({value: this.userModel.bankAccountDetail.citizenStatus, disabled:'true'}),      
      this.userModel.bankAccountDetail.initialDepositAmount = 5000;
      this.initialDepositAmountControl = new FormControl({value: this.userModel.bankAccountDetail.initialDepositAmount, disabled:'true'}),
      this.customerRegistrationControl = new FormGroup(
        {        
          nameControl1 :  this.nameControl,
          userNmaeControl : new FormControl(this.userModel.userNmae, [Validators.required]),
          passwordControl: new FormControl(this.userModel.password, [Validators.required]),
          guardianTypeControl: new FormControl(this.userModel.guardianType, [Validators.required]),
          guardianNameControl: new FormControl(this.userModel.guardianName, [Validators.required]),
          addressControl: new FormControl(this.userModel.address, [Validators.required]),
          citizenshipControl: new FormControl(this.userModel.citizenship, [Validators.required]),
          stateControl: new FormControl(this.userModel.state, [Validators.required]),
          countryControl: new FormControl(this.userModel.country, [Validators.required]),
          EmailAddressControl: new FormControl(this.userModel.EmailAddress, [Validators.required, Validators.email]),
          genderControl: new FormControl(this.userModel.gender, [Validators.required]),
          maritalStatusControl : new FormControl(this.userModel.maritalStatus, [Validators.required]),
          contactNoControl : new FormControl(this.userModel.contactNo, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
          dobControl: this.dobControl,
          registrationDateControl: new FormControl({value: regDateData, disabled: true}),
          accountTypeControl: new FormControl(this.userModel.accountType, [Validators.required]),
          branchNameControl: new FormControl(this.userModel.bankAccountDetail.branchName, [Validators.required]),
          citizenStatusControl: this.citizenStatusControl,
          initialDepositAmountControl: this.initialDepositAmountControl,
          identificationProofTypeControl: this.idProofTypeControl,
          identificationDocumentNoControl: new FormControl(this.userModel.bankAccountDetail.identificationDocumentNumer,
             [Validators.required, this.conditionalValidator((() => this.idProofTypeControl.value === "Pan Card"), Validators.pattern("^[a-zA-Z0-9]{12}$"))]),
          refAccHolderNameControl: new FormControl(this.userModel.bankAccountDetail.referenceAccountHolderName, [Validators.required]),
          refAccHolderNumberControl: new FormControl(this.userModel.bankAccountDetail.referenceAccountHolderNumber, [Validators.required]),
          refAccHolderAddressControl: new FormControl(this.userModel.bankAccountDetail.referenceAccountHolderAddress, [Validators.required]),
        });
    }   
    
    
   
        

   ngOnInit(): void {
    this.customerRegistrationControl.get('registrationDateControl').patchValue(new Date());
  
      this.service.getCountries().subscribe(data => 
        {   
          this.countriesModel = data;                  
        });        
                 
        this.service.getStates().subscribe(data => 
        {   
          this.stateModel = data;            
        });          
    }

    onCountryChange(countryId: string)
    {
      if(countryId !== null)
      {
          this.statesForSelectedCountry = this.stateModel.filter(state => state.country_id === countryId);
      }      
    }   

    onDOBChanged(dob: Date)
    {
      if(dob !== null)
      { 
        
        const dateEntered = Date.parse(this.dobControl.value)  
        const dateDiff = Math.abs(dateEntered - Date.now())        
        const daysInTotal = dateDiff / (1000 * 60 * 60 *24);
        const age = daysInTotal / 365   ;
        console.log("Age: ",  age);
       let citizenState: string;     
       if(age < 18)
       {
        citizenState = "Minor";
       }
       else if (age >= 18 && age <= 60)
       {
        citizenState = "Normal";
       }
       else
       {
        citizenState = "Senior";
       }
      this.customerRegistrationControl.patchValue(
        {
          citizenStatusControl: citizenState
        }
      );       
      }      
    }

    onAccountTypeChange(accountType: string)
    {      
      let initAmount:Number;
      if(accountType === "Savings")
      {          
        initAmount = 5000;   
      }
      else
      {
          initAmount = 0;
      }
            this.customerRegistrationControl.patchValue(
        {
            initialDepositAmountControl: Number(initAmount)
        }
      );      
    }

    conditionalValidator(predicate : (() => boolean) , validator: ValidatorFn)
    {      
        return((formControl: FormControl) => 
        {          
            if(!predicate())
            {              
                return null;
            }            
            return validator(formControl);            
        })
    }
}
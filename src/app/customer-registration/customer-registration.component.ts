import { ChangeDetectorRef, Component, OnInit, Predicate, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, FormControl, Validator, Validators, NG_VALIDATORS, ValidatorFn, Form } from '@angular/forms';
import { User } from '../Model/User.Model';
import {Country, State, City} from 'country-state-city';
import { DropDownDataService  } from '../Service/DropdownDataService.Model'
import { Observable } from 'rxjs';
import { CountryModel, UserConstants } from '../Constants/User.Contants';
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
  
  countriesModel : CountryModel[];
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

    constructor(private service: DropDownDataService, public datePipe: DatePipe )
    {      
      
      //Set the Item Source for dropdown controls
      this.GenderModel = new UserConstants().Gender;
      this.MaritalStatusModel = new UserConstants().MaritalStatus;
      this.AccountTypeModel = new UserConstants().AccountType;
      this.IdentificationProofTypeModel = new UserConstants().IdentificationProofType;

      //Initialize form controls along with its validators
      this.nameControl = new FormControl(this.userModel.name, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]);
      this.userNmaeControl =  new FormControl(this.userModel.userNmae, [Validators.required]);
      this.passwordControl = new FormControl(this.userModel.password, [Validators.required]);
      this.guardianTypeControl = new FormControl(this.userModel.guardianType, [Validators.required]);
      this.guardianNameControl = new FormControl(this.userModel.guardianName, [Validators.required]);
      this.addressControl = new FormControl(this.userModel.address, [Validators.required]);
      this.citizenshipControl = new FormControl(this.userModel.citizenship, [Validators.required]);
      this.stateControl = new FormControl(this.userModel.state, [Validators.required]);
      this.countryControl = new FormControl('', [Validators.required]);
      this.EmailAddressControl = new FormControl(this.userModel.EmailAddress, [Validators.required, Validators.email]);
      this.genderControl = new FormControl(this.userModel.gender, [Validators.required]);
      this.maritalStatusControl = new FormControl(this.userModel.maritalStatus, [Validators.required]);
      this.contactNoControl = new FormControl(this.userModel.contactNo, [Validators.required, Validators.pattern("^[0-9]{10}$")]);      
      this.registrationDate = new FormControl({value:'', disabled: true});
      this.accountTypeControl = new FormControl(this.userModel.accountType, [Validators.required]);
      this.branchNameControl = new FormControl('', [Validators.required]);
      this.idProofTypeControl = new FormControl('', [Validators.required]); 
      
      this.maxDate = moment(new Date()).format('YYYY-MM-DD');
      this.dobControl = new FormControl(this.userModel.dob, [Validators.required, DOBAgeValidatorForBankAccountOpening()]),
      this.registrationDate = new FormControl({value:'', disabled: true}); 
      this.citizenStatusControl = new FormControl({value: '', disabled:'true'}),      
      
      this.initialDepositAmountControl = new FormControl({value: '', disabled:'true'}),
      this.identificationDocumentNoControl = new FormControl('',
        [Validators.required, this.conditionalValidator((() => this.idProofTypeControl.value === "Pan Card"), Validators.pattern("^[a-zA-Z0-9]{12}$"))]);
     this.refAccHolderNameControl = new FormControl('', [Validators.required]);
     this.refAccHolderNumberControl= new FormControl('', [Validators.required]);
     this.refAccHolderAddressControl= new FormControl('', [Validators.required]);

      
      this.customerRegistrationControl = new FormGroup(
        {        
          nameControl1 :  this.nameControl,
          userNmaeControl : this.userNmaeControl,
          passwordControl: this.passwordControl,
          guardianTypeControl: this.guardianTypeControl,
          guardianNameControl: this.guardianNameControl,
          addressControl: this.addressControl,
          citizenshipControl: this.citizenshipControl,
          stateControl: this.stateControl,
          countryControl: this.countryControl,
          EmailAddressControl: this.EmailAddressControl,
          genderControl: this.genderControl,
          maritalStatusControl : this.maritalStatusControl,
          contactNoControl : this.contactNoControl,
          dobControl: this.dobControl,
          registrationDateControl: this.registrationDate,
          accountTypeControl: this.accountTypeControl,
          branchNameControl: this.branchNameControl,
          citizenStatusControl: this.citizenStatusControl,
          initialDepositAmountControl: this.initialDepositAmountControl,
          identificationProofTypeControl: this.idProofTypeControl,
          identificationDocumentNoControl: this.identificationDocumentNoControl,
          refAccHolderNameControl: this.refAccHolderNameControl,
          refAccHolderNumberControl: this.refAccHolderNumberControl,
          refAccHolderAddressControl: this.refAccHolderAddressControl,
        });
        
        this.service.getStates().then(data => 
          {   
              this.stateModel = data;
              this.GetDefaultUserDetails();
              this.SetDefaultUserDetails();  
          });                 
        this.service.getCountries()
        .then(data => 
        {   
          this.countriesModel = data;          
        });    
             
    }   

   ngOnInit(): void {   
    
        this.UpdateRegistrationDate();       
       
    }

    UpdateRegistrationDate()
    {
      this.customerRegistrationControl.get('registrationDateControl').patchValue( moment(new Date()).format('YYYY-MM-DD'));
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

    SetFormValues(user: User)
    {         
        let custRegForm = {
          nameControl1 : user.name,
          userNmae: user.userNmae,
          password: user.password,
          guardianType: user.guardianType,
          guardianName: user.guardianName,
          address: user.address,
          citizenship: user.citizenship,
          country: user.country,
          state: user.state,
          email: user.EmailAddress,
          gender: user.gender,
          maritalStatus: user.maritalStatus,
          contactNumber: user.contactNo,
          dob: user.dob,
          regDate: user.registrationDate,
          accType: user.bankAccountDetail.accountType,
          branchName: user.bankAccountDetail.branchName,
          citizenStatus: user.bankAccountDetail.citizenStatus,
          initialDepositAmount: user.bankAccountDetail.initialDepositAmount,
          identificationProofType: user.bankAccountDetail.identificationProofType,
          identificationDocumentNoControl: user.bankAccountDetail.identificationDocumentNumer,
          referenceAccountHolderName: user.bankAccountDetail.referenceAccountHolderName,
          referenceAccountHolderNumber: user.bankAccountDetail.referenceAccountHolderNumber,
          referenceAccountHolderAddress: user.bankAccountDetail.referenceAccountHolderAddress         
        };
        this.customerRegistrationControl.setValue(custRegForm);
      }

      GetDefaultUserDetails() : User
      {
        this.userModel = new User();
        this.userModel.bankAccountDetail = new BankAccountDetails();
        this.userModel.country = 'India';
        this.userModel.state = 'Tamil Nadu';
        this.userModel.accountType = 'Savings';
        this.userModel.gender = 'Male';
        this.userModel.maritalStatus = 'Single';
        this.userModel.registrationDate = moment(new Date()).format('YYYY-MM-DD');
        this.userModel.bankAccountDetail.initialDepositAmount = 5000;
        return this.userModel;
      }

      SetDefaultUserDetails()
      {       
        let defaultCountry : any = this.countriesModel.find(country => country.name === this.userModel.country );       
        this.customerRegistrationControl.get('countryControl').patchValue(defaultCountry.id);        
        this.customerRegistrationControl.get('accountTypeControl').patchValue(this.userModel.accountType);
        this.customerRegistrationControl.get('genderControl').patchValue(this.userModel.gender);
        this.customerRegistrationControl.get('maritalStatusControl').patchValue(this.userModel.maritalStatus);
        this.customerRegistrationControl.get('registrationDateControl').patchValue(this.userModel.registrationDate);
        this.customerRegistrationControl.get('initialDepositAmountControl').patchValue(this.userModel.bankAccountDetail.initialDepositAmount);           
        this.onCountryChange(defaultCountry.id);
        let defaultState : any = this.stateModel.find(state => state.name === this.userModel.state );         
        this.customerRegistrationControl.get('stateControl').patchValue(defaultState.id);   
      }

      onCustomerRegistrationFormSubmitted()
      {
        console.log("Customer Details Submitted");
      }
   }
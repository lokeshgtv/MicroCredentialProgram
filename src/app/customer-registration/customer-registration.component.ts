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
import { Router, ActivatedRoute } from '@angular/router';


import { DOBAgeValidatorForBankAccountOpening } from '../Validators/CustomValidators'
import { UserService } from '../Service/UserService.Service';


@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
  
  IsCustomerRegistration: boolean = true;
  customerId: string;
  countriesModel : CountryModel[];
  stateModel : any[];
  statesForSelectedCountry: any[];  
  GenderModel:string[];
  MaritalStatusModel:string[];
  AccountTypeModel:string[]
  IdentificationProofTypeModel:string[];
  userModel:User = new User();  

  customerRegistrationControl: FormGroup;
  name: FormControl;
  userNmae: FormControl;
  password: FormControl;
  guardianType: FormControl;
  guardianName: FormControl;
  address: FormControl;
  citizenship: FormControl;
  state: FormControl;
  country: FormControl;
  EmailAddress: FormControl;
  gender: FormControl
  maritalStatus : FormControl;
  contactNo : FormControl;
  dob: FormControl;
  registrationDate: FormControl;
  accountType: FormControl;
  branchName: FormControl;
  citizenStatus: FormControl;
  initialDepositAmount: FormControl;
  identificationProofType: FormControl;
  identificationDocumentNumer: FormControl;
  referenceAccountHolderName: FormControl;
  referenceAccountHolderNumber: FormControl;
  referenceAccountHolderAddress: FormControl;
  
  maxDate: string;

  tempDate: Date;

    constructor(private service: DropDownDataService, public datePipe: DatePipe, 
      public userService: UserService, private route: ActivatedRoute,
      private router: Router )
    {      
      console.log("Loaded Registration");
      //Set the Item Source for dropdown controls
      this.GenderModel = new UserConstants().Gender;
      this.MaritalStatusModel = new UserConstants().MaritalStatus;
      this.AccountTypeModel = new UserConstants().AccountType;
      this.IdentificationProofTypeModel = new UserConstants().IdentificationProofType;

      //Initialize form controls along with its validators
      this.name = new FormControl(this.userModel.name, [Validators.required, Validators.pattern("^[a-zA-Z ]+$")]);
      this.userNmae =  new FormControl(this.userModel.userNmae, [Validators.required]);
      this.password = new FormControl(this.userModel.password, [Validators.required]);
      this.guardianType = new FormControl(this.userModel.guardianType, [Validators.required]);
      this.guardianName = new FormControl(this.userModel.guardianName, [Validators.required]);
      this.address = new FormControl(this.userModel.address, [Validators.required]);
      this.citizenship = new FormControl(this.userModel.citizenship, [Validators.required]);
      this.state = new FormControl(this.userModel.state, [Validators.required]);
      this.country = new FormControl('', [Validators.required]);
      this.EmailAddress = new FormControl(this.userModel.EmailAddress, [Validators.required, Validators.email]);
      this.gender = new FormControl(this.userModel.gender, [Validators.required]);
      this.maritalStatus = new FormControl(this.userModel.maritalStatus, [Validators.required]);
      this.contactNo = new FormControl(this.userModel.contactNo, [Validators.required, Validators.pattern("^[0-9]{10}$")]);      
      this.registrationDate = new FormControl({value:'', disabled: true});
      this.accountType = new FormControl(this.userModel.accountType, [Validators.required]);
      this.branchName = new FormControl('', [Validators.required]);
      this.identificationProofType = new FormControl('', [Validators.required]); 
      
      this.maxDate = moment(new Date()).format('YYYY-MM-DD');
      this.dob = new FormControl(this.userModel.dob, [Validators.required, DOBAgeValidatorForBankAccountOpening()]),
      this.registrationDate = new FormControl({value:'', disabled: true}); 
      this.citizenStatus = new FormControl({value: '', disabled:'true'}),      
      
      this.initialDepositAmount = new FormControl({value: '', disabled:'true'}),
      this.identificationDocumentNumer = new FormControl('',
        [Validators.required, this.conditionalValidator((() => this.identificationProofType.value === "Pan Card"), Validators.pattern("^[a-zA-Z0-9]{12}$"))]);
     this.referenceAccountHolderName = new FormControl('', [Validators.required]);
     this.referenceAccountHolderNumber= new FormControl('', [Validators.required]);
     this.referenceAccountHolderAddress= new FormControl('', [Validators.required]);

      
      this.customerRegistrationControl = new FormGroup(
        {        
          name :  this.name,
          userNmae: this.userNmae,
          password: this.password,
          guardianType: this.guardianType,
          guardianName: this.guardianName,
          address: this.address,
          citizenship: this.citizenship,
          state: this.state,
          country: this.country,
          EmailAddress: this.EmailAddress,
          gender: this.gender,
          maritalStatus : this.maritalStatus,
          contactNo : this.contactNo,
          dob: this.dob,
          registrationDate: this.registrationDate,
          accountType: this.accountType,
          branchName: this.branchName,
          citizenStatus: this.citizenStatus,
          initialDepositAmount: this.initialDepositAmount,
          identificationProofType: this.identificationProofType,
          identificationDocumentNumer: this.identificationDocumentNumer,
          referenceAccountHolderName: this.referenceAccountHolderName,
          referenceAccountHolderNumber: this.referenceAccountHolderNumber,
          referenceAccountHolderAddress: this.referenceAccountHolderAddress,
        });
        
        this.service.getStates().then(data => 
          {   
              this.stateModel = data;
              if(this.IsCustomerRegistration)
              {
                this.GetDefaultUserDetails();
                this.SetDefaultUserDetails();  
                this.UpdateRegistrationDate();      
              }
          });                 
        this.service.getCountries()
        .then(data => 
        {   
          this.countriesModel = data;          
        });    
             
    }   

   ngOnInit(): void {   
    
        if(!this.IsCustomerRegistration)
        {
          this.userService.GetUserDetailByCustId(this.customerId)
          .subscribe((userData) =>
          {
            this.SetFormValues(userData);
          })          
        }
       
    }

    UpdateRegistrationDate()
    {
      this.customerRegistrationControl.get('registrationDate').patchValue( moment(new Date()).format('YYYY-MM-DD'));
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
        
        const dateEntered = Date.parse(this.dob.value)  
        const dateDiff = Math.abs(dateEntered - Date.now())        
        const daysInTotal = dateDiff / (1000 * 60 * 60 *24);
        const age = daysInTotal / 365;
        
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
          citizenStatus: citizenState
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
            initialDepositAmount: Number(initAmount)
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
          name : user.name,
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
        this.customerRegistrationControl.get('accountType').patchValue(this.userModel.accountType);
        this.customerRegistrationControl.get('gender').patchValue(this.userModel.gender);
        this.customerRegistrationControl.get('maritalStatus').patchValue(this.userModel.maritalStatus);
        this.customerRegistrationControl.get('registrationDate').patchValue(this.userModel.registrationDate);
        this.customerRegistrationControl.get('initialDepositAmount').patchValue(this.userModel.bankAccountDetail.initialDepositAmount);                          
      }

      onCustomerRegistrationFormSubmitted()
      {
        if(this.IsCustomerRegistration)
        {
          this.userModel = new User(this.customerRegistrationControl.value);
          this.userModel.bankAccountDetail = new BankAccountDetails();        
          this.userModel.bankAccountDetail.Name = this.userModel.name;
          this.userModel.bankAccountDetail.accountNumber = "123456789";
          this.userModel.bankAccountDetail.accountType = 
                this.customerRegistrationControl.get('accountType').value;
          this.userModel.bankAccountDetail.bankName = "Indian Bank";
          this.userModel.bankAccountDetail.branchName = 
              this.customerRegistrationControl.get('branchName').value;
          this.userModel.bankAccountDetail.citizenStatus = 
              this.customerRegistrationControl.get('citizenStatus').value;
          this.userModel.bankAccountDetail.initialDepositAmount = 
              this.customerRegistrationControl.get('initialDepositAmount').value;
          this.userModel.bankAccountDetail.identificationProofType = 
              this.customerRegistrationControl.get('identificationProofType').value;
          this.userModel.bankAccountDetail.identificationDocumentNumer = 
              this.customerRegistrationControl.get('identificationDocumentNumer').value;
          this.userModel.bankAccountDetail.referenceAccountHolderName = 
              this.customerRegistrationControl.get('referenceAccountHolderName').value;
          this.userModel.bankAccountDetail.referenceAccountHolderNumber = 
              this.customerRegistrationControl.get('referenceAccountHolderNumber').value;
          this.userModel.bankAccountDetail.referenceAccountHolderNumber = 
              this.customerRegistrationControl.get('referenceAccountHolderNumber').value;
          this.userModel.bankAccountDetail.referenceAccountHolderAddress = 
              this.customerRegistrationControl.get('referenceAccountHolderAddress').value;
          this.userModel.bankAccountDetail.accountActivationDate = new Date();

          this.userService.AddUserDetail(this.userModel)
          .subscribe((result) =>
          {
            alert("User Id Created :" + result + "You will be re-directed to login page");
            this.router.navigate(['./login']);

          })
        }
      }
   }
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { User } from '../Model/User.Model';
import {Country, State, City} from 'country-state-city';
import { DropDownDataService  } from '../Service/DropdownDataService.Model'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {
   
  countriesModel : any[];
  stateModel : any[];
  statesForSelectedCountry: any[];
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
  registrationDateControl: FormControl;
  accountTypeControl: FormControl;

    constructor(private service: DropDownDataService)
    {
      this.customerRegistrationControl = new FormGroup(
        {        
          nameControl : new FormControl(this.userModel.name, [Validators.required]),
          userNmaeControl : new FormControl(this.userModel.userNmae, [Validators.required]),
          passwordControl: new FormControl(this.userModel.password, [Validators.required]),
          guardianTypeControl: new FormControl(this.userModel.guardianType, [Validators.required]),
          guardianNameControl: new FormControl(this.userModel.guardianName, [Validators.required]),
          addressControl: new FormControl(this.userModel.address, [Validators.required]),
          citizenshipControl: new FormControl(this.userModel.citizenship, [Validators.required]),
          stateControl: new FormControl(this.userModel.state, [Validators.required]),
          countryControl: new FormControl(this.userModel.country, [Validators.required]),
          EmailAddressControl: new FormControl(this.userModel.state, [Validators.required, Validators.email]),
          genderControl: new FormControl(this.userModel.state, [Validators.required]),
          maritalStatusControl : new FormControl(this.userModel.state, [Validators.required]),
          contactNoControl : new FormControl(this.userModel.state, [Validators.required]),
          dobControl: new FormControl(this.userModel.state, [Validators.required]),
          registrationDateControl: new FormControl(this.userModel.state, [Validators.required]),
          accountTypeControl: new FormControl(this.userModel.state, [Validators.required])
        });
    }   
    
    
   
        

   ngOnInit(): void {
  
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
}
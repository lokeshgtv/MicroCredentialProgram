import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { User } from '../Model/User.Model';
import {Country, State, City} from 'country-state-city';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css']
})
export class CustomerRegistrationComponent implements OnInit {

  constructor(private http: HttpClient)
  {

  }
  
    //countriesModel: CountryModel[] = [];
    countriesList: any[];
    userModel: User;
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
   

   ngOnInit(): void {
      
    //this.countriesList = Country.GetAllCountries();
    console.log("Writing Details test", Country.GetAllCountries() ) ;   
    console.log("Writing Details test", this.countriesList.keys[0])   
    

    //this.countriesList = countries;
     for(let countryInfo of this.countriesList)
     {
      console.log("Writing Details", countryInfo)
       console.log(countryInfo)
     }

    //  console.log("Writing Details Values" + countries);
    //  countries.forEach(country => {
    //    this.countriesModel.push(country);
       
     //});
    //console.log("Countries Details : " + this.countriesModel.values);
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
        countryControl: new FormControl(this.userModel.state, [Validators.required]),
        EmailAddressControl: new FormControl(this.userModel.state, [Validators.required, Validators.email]),
        genderControl: new FormControl(this.userModel.state, [Validators.required]),
        maritalStatusControl : new FormControl(this.userModel.state, [Validators.required]),
        contactNoControl : new FormControl(this.userModel.state, [Validators.required]),
        dobControl: new FormControl(this.userModel.state, [Validators.required]),
        registrationDateControl: new FormControl(this.userModel.state, [Validators.required]),
        accountTypeControl: new FormControl(this.userModel.state, [Validators.required])
      }
    )

  }

}


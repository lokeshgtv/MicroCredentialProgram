import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, FormControl, Validator, Validators, NG_VALIDATORS, ValidatorFn, Form } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  imagePath = "src/BankImage.jpeg";  
  loginFormsControl: FormGroup;  
  userNmaeControl: FormControl;
  passwordControl: FormControl;

  constructor() { 


    this.userNmaeControl =  new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);
    this.loginFormsControl = new FormGroup(
      {                
        userNmaeControl : this.userNmaeControl,
        passwordControl: this.passwordControl,
      });
  }

  ngOnInit(): void {
  }

  onLoginFormSubmitted()
  {
    console.log("Login Form Submitted")
  }

}

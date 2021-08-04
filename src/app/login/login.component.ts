import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup, FormControl, Validator, Validators, NG_VALIDATORS, ValidatorFn, Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../Service/UserService.Service'
import { Observable } from 'rxjs';

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
  loginDetail : loginModel = new loginModel();

  constructor( private route: ActivatedRoute,
    private router: Router, private userService: UserService) { 


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
    this.loginDetail = new loginModel(this.loginFormsControl.value);
    console.log("Login Details ", this.loginDetail)
    let uName = this.loginFormsControl.get('userNmaeControl').value;
    let pwd = this.loginFormsControl.get('passwordControl').value;
    this.userService.IsValidUser(uName, pwd)
    .subscribe((result) => 
    {
        if(result === '')
        {
          alert("Invalid User Name and Password");
          this.loginFormsControl.get('userNmaeControl').patchValue('');
          this.loginFormsControl.get('passwordControl').patchValue('');
        }
        else
        {
          alert("Login Successful. You will be re-directed to User Details")
          this.router.navigate(['userDetail', result], {relativeTo: this.route})
        }
    })       
  }

}

export class loginModel
{
  userNmaeControl: string;
  passwordControl: string;
  constructor(init?: Partial<loginModel>)
  {
      Object.assign(this, init);
  }
}

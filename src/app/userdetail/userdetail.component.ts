import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import { UserService } from '../Service/UserService.Service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  IsCustomerRegistration: boolean = true;
  public navbarCollapsed = true;
  constructor(private route: ActivatedRoute, private router: Router, private userService : UserService) { }

  ngOnInit(): void {

    this.IsCustomerRegistration = !this.userService.GetUserLoggedInStatus();
    // this.route.params
    //   .subscribe( (data: Params) =>
    //   {   
    //     console.log(data['id']);     
    //     if(data['id'] === undefined)
    //     {
    //       console.log("Parameter Un defined");
    //       this.IsCustomerRegistration = true;
    //     }
    //     else
    //     {
    //       console.log("Parameter defined", data.parameter)          ;
    //       this.IsCustomerRegistration = false;
    //     }        
    //   })

  }

}

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
  }

}

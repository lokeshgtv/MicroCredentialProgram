import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  IsCustomerRegistration: boolean = true;
  public navbarCollapsed = true;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.data
      .subscribe( (data: Data) =>
      {
        this.IsCustomerRegistration = data[]  
      })

  }

}

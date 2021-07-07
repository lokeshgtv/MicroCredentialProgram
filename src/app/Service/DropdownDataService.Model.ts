import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DropDownDataService {

   countries: Observable<any>;    

   constructor(private http: HttpClient) {
       
    }
   

    public getCountries(): Observable<any>{
        return this.http.get("../../assets/country.json");  
    }

    public getStates(): Observable<any>{
        return this.http.get("../../assets/state.json");  
    }
}
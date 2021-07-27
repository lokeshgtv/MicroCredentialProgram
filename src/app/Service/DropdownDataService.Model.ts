import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DropDownDataService {

   public countries: any[] = [];    
   public states: any[] = [];    

   constructor(private http: HttpClient) {
       if(this.countries.length === 0)
        {
            this.getCountries()
            .then(data =>
                {                    
                    this.countries = data;                    
                })
        }       

        if(this.states.length === 0)
        {
            this.getStates()
            .then(data =>
                {                    
                    this.states = data;                    
                })
        }  
    }   

    public getCountries(): Promise<any>{
        if(this.countries.length === 0)
            return this.http.get("../../assets/country.json").toPromise();  
        else
            return Promise.resolve(this.countries);
    }

    public getStates(): Promise<any>{
        if(this.states.length === 0)
            return this.http.get("../../assets/state.json").toPromise();  
        else
        return Promise.resolve(this.states);
    }
}
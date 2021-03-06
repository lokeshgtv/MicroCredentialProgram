import {  Validator, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export function DOBAgeValidatorForBankAccountOpening() : ValidatorFn
{

    const minAge: number = 18;
    const maxAge: number = 96;

    
    return((control : AbstractControl) : {[s: string] : boolean} => 
    {           
        const dateEntered = Date.parse(control.value) ;
        const dateDiff = Math.abs(dateEntered - Date.now());
        const daysInTotal = dateDiff / (1000 * 60 * 60 *24);
        const age = daysInTotal / 365   ;
        console.log("Age calculated :", age);
        if(age < minAge || age > maxAge)
        {
             return {'Invalid DOD': true};
        }

        if(dateEntered === null)
            return null

        return null;
    });
}

export function MinimimDateValidator(mimimumAllowedDate: Date) : ValidatorFn
{
    return((control : AbstractControl) : {[s: string] : boolean} => 
    {  
        const dateEntered = Date.parse(control.value);
        const dateAllowed = Date.parse(mimimumAllowedDate.toDateString());       
        if(dateEntered < dateAllowed)      
        {            
            return {'Invalid Date': true};
        }
        if(dateEntered === null)
            return null
        
        return null;
    });
}

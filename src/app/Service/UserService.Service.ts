import { IUserService } from './UserService.Interface';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../Model/User.Model';

export class UserService implements IUserService
{
    IsValidUser(uName: string, pwd: string) : Observable<string>
    {
        if(uName === 'admin' && pwd === 'admin')
        {
            //return success
            return of('123456');
        }
        return of("");
    }
    GetUserDetailByCustId(custId: string) : Observable<User>
    {
        return of(new User());
    }
    UpdateUserDetail(userDetail: User) : Observable<boolean>
    {
        return of(true);
    }
    AddUserDetail(userDetail: User) : Observable<string>
    {
        return of("");
    }
}
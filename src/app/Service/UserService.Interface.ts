import { Observable } from 'rxjs';
import { User } from '../Model/User.Model';

export interface IUserService
{
    IsValidUser(uName: string, pwd: string) : Observable<string>;
    GetUserDetailByCustId(custId: string) : Observable<User>;
    UpdateUserDetail(userDetail: User) : Observable<boolean>;
    AddUserDetail(userDetail: User) : Observable<string>;
}
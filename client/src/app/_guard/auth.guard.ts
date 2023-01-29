import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _accountService: AccountService
    ,private _toastr: ToastrService){}
  canActivate(): Observable<boolean> {
    return this._accountService.currentUser$.pipe(
      map((user: any) => {
        if(user) return true;
        else {
          this._toastr.error('You shall not pass!')
          return false;
        }
      })
    );
  }
  
}

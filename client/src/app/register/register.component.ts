import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();
  model:any={}

  constructor(
    private _accountService: AccountService
    ,private _toastr: ToastrService){}

  register(){
    this._accountService.register(this.model).subscribe({
      next: () =>{
        this.cancel();
      },
      error: err => this._toastr.error(err)
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}

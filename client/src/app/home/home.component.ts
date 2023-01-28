import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  registerMode:boolean = false;
  users:any;

  constructor(private _http:HttpClient) { }

  ngOnInit(): void{
    this.getUsers();
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this._http.get("http://localhost:5183/api/users").subscribe({
      next: res => this.users = res,
      error: err => console.log(err),
      complete: () => console.log("Request is complete.")
    });
  }

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
}

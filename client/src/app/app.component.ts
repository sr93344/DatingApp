import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Hello world';
  users:any;
  constructor(private _http:HttpClient){
  }

  ngOnInit(){
    this._http.get("http://localhost:5183/api/users").subscribe({
      next: res => this.users = res,
      error: err => console.log(err),
      complete: () => console.log("Request is complete.")
    })
  }
}

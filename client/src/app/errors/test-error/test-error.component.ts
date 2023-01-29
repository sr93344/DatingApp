import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl = "http://localhost:5183/api/";
  validationErrors: string[] = [];

  constructor(private _http:HttpClient) {}

  ngOnInit() : void{

  }

  get404Error(){
    this._http.get(this.baseUrl+'buggy/not-found').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get400Error(){
    this._http.get(this.baseUrl+'buggy/bad-request').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get500Error(){
    this._http.get(this.baseUrl+'buggy/server-error').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get401Error(){
    this._http.get(this.baseUrl+'buggy/auth').subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })
  }

  get400ValidationError(){
    this._http.post(this.baseUrl+'account/register',{}).subscribe({
      next: res => console.log(res),
      error: err => {
        console.log(err);
        this.validationErrors = err;
      }
    })
  }
}

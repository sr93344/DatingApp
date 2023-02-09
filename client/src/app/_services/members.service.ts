import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members:Member[]=[];
  baseUrl = environment.ApiUrl;
  constructor(private _http:HttpClient) { }

  getMembers(){
    if(this.members.length>0) return of(this.members);
    return this._http.get<Member[]>(this.baseUrl+'users').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username:string){
    const member = this.members.find(x => x.userName == username);
    if(member) return of(member);
    return this._http.get<Member>(this.baseUrl+ 'users/'+ username);
  }

  updateMember(member:Member){
    return this._http.put(this.baseUrl+'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index]= {...this.members[index], ...member}
      })
    );
  }
}

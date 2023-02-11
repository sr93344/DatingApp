import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  // members$:Observable<Member[]>|undefined;

  members: Member[]|undefined;
  pagination: Pagination|undefined;
  userParams: UserParams | undefined;
  genderList = [{value:'male', display:'Males'}, {value:'female', display:'Females'}];


  constructor(private _memberService: MembersService){
    this.userParams = this._memberService.getUserParams();

  }

  ngOnInit():void{
    this.loadMembers();
    // this.members$ = this._memberService.getMembers();
  }

  loadMembers(){
    if(this.userParams){
      this._memberService.setUserParams(this.userParams);
      this._memberService.getMembers(this.userParams).subscribe({
        next: response =>{
          if(response.result && response.pagination){
            this.members = response.result;
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

  resetFilters(){
    this.userParams = this._memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event:any){
    if(this.userParams && this.userParams.pageNumber!=event.page){
      this.userParams.pageNumber = event.page;
      this._memberService.setUserParams(this.userParams);
      this.loadMembers();
    }
  }

}

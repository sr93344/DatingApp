import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  huburl = environment.hubUrl;
  private hubConnection?:HubConnection;
  private onlineUserSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUserSource.asObservable();

  constructor(private toastr:ToastrService, private _router:Router) { }

  createHubConnection(user:User){
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.huburl+'presence',{
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();
    
    this.hubConnection.start().catch(err => console.log(err));

    this.hubConnection.on('UserIsOnline', username =>{
      this.onlineUsers$.pipe(take(1)).subscribe({
        next:usernames => this.onlineUserSource.next([...usernames, username])
      })
    });

    this.hubConnection.on('UserIsOffline', username =>{
      this.onlineUsers$.pipe(take(1)).subscribe({
        next:usernames => this.onlineUserSource.next(usernames.filter(x => x !== username))
      })
    });

    this.hubConnection.on('GetOnlineUsers', usernames =>{
      this.onlineUserSource.next(usernames);
    });

    this.hubConnection.on('NewMessageReceived', ({username, knownAs}) => {
      this.toastr.info(knownAs + ' has sent you a new message! Click me to see it')
        .onTap
        .pipe(take(1))
        .subscribe({
          next: () => this._router.navigateByUrl('/members/'+username+'?tab=Messages')
        });
    });
  }

  stopHubConnection(){
    this.hubConnection?.stop().catch(err => console.log(err));
  }
}

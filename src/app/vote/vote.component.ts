import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from '../shared/api.service';
import { VoteModel } from './vote.model';
import { StatModel } from './vote.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  presidentData !: any;
  vPresidentData !: any;
  secretaryData !: any;
  President = '';
  Vpresident = '';
  Secretary = '';
  voteobj : VoteModel = new VoteModel();
  statObj : StatModel = new StatModel();
  vstat !: boolean; 
  uId !: any;
  uInfo !: any;

  constructor(private api : ApiService, private notification: NzNotificationService, private http: HttpClient) { }

  ngOnInit(): void {
    this.vstat = this.localStorageItem();
    this.getAllPresident();
    this.getAllVpresident();
    this.getAllSecretary();
    // console.log{this}
    
  }
  tallyVote(){
    console.log("test")
    this.voteobj.President = this.President
    this.voteobj.Vpresident = this.Vpresident
    this.voteobj.Secretary = this.Secretary

    this.api.postVote(this.voteobj)
    .subscribe(res=>{
      this.notification.success('success','Login Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,
       })
      this.uId = localStorage.getItem('sessionUserId');
      this.statObj.id = localStorage.getItem('sessionUserId');
      this.http.get<any>("http://localhost:3000/Users/"+this.uId).subscribe(data=>{
        this.statObj.email = data.email;
        this.statObj.password = data.password;
        this.statObj.accountType = data.accountType;
        this.statObj.voteStat = "true";
        localStorage.setItem('sessionUserVstat', "true");
        this.api.updateUser(this.statObj, this.statObj.id)
        .subscribe(res=>{
        this.notification.success('success','Login Successful',{
          nzDuration: 5000,
          nzPauseOnHover: false,
          nzAnimate: true,
  
        })
      })
    })
      },
      err=>{
        this.notification.success('success','Login Successful',{
          nzDuration: 2000,
          nzPauseOnHover: false,
          nzAnimate: true,
  
        })
      })
  }
  public localStorageItem(): boolean {
    if (localStorage.getItem("sessionUserVstat") == "true"){
      return true
    } else {
      return false;
    };
  } 
  getAllPresident(){
    this.api.getPresident()
    .subscribe(res=>{
      this.presidentData = res;
    })
  }
  getAllVpresident(){
    this.api.getVpresident()
    .subscribe(res=>{
      this.vPresidentData = res;
    })
  }
  getAllSecretary(){
    this.api.getSecretary()
    .subscribe(res=>{
      this.secretaryData = res;
    })
  }
  // public localStorageItemId(): string {
  //  this.uId = localStorage.getItem("sessionUserId")
  // } 

}

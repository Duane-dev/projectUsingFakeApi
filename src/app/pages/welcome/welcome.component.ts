import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  checkStatus!: boolean;
  isCollapsed = false;
  sample = 69;
  constructor(private router: Router, private http: HttpClient, private notification: NzNotificationService) { }
  presA = (percent: number): string => `${percent}%`;
  presB = (percent: number): string => `${percent}%`;
  presC = (percent: number): string => `${percent}%`;
  vPresA = (percent: number): string => `${percent}%`;
  vPresB = (percent: number): string => `${percent}%`;
  vPresC = (percent: number): string => `${percent}%`;
  SecA = (percent: number): string => `${percent}%`;
  SecB = (percent: number): string => `${percent}%`;
  SecC = (percent: number): string => `${percent}%`;
  totalVotes !: any;
  presACount !: any;
  presBCount !: any;
  presCCount !: any;
  vpresACount !: any;
  vpresBCount !: any;
  vpresCCount !: any;
  secACount !: any;
  secBCount !: any;
  secCCount !: any;
  
  ngOnInit() {
    this.PresACount();
    this.PresBCount();
    this.PresCCount();
    this.vPresACount();
    this.vPresBCount();
    this.vPresCCount();
    this.SecACount();
    this.SecBCount();
    this.SecCCount();
    this.TotalVotes();
    this.checkStatus = this.localStorageItem();
    if(this.checkStatus == false){
      this.router.navigate(['login'])
    }
  }

  public localStorageItem(): boolean {
    if (localStorage.getItem("sessionUser") == "Admin" || localStorage.getItem("sessionUser") == "User") {
      return true
    } else {
      return false;
    };
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

TotalVotes(){
   this.http.get<any>("http://localhost:3000/Votes").subscribe(res=>{
     localStorage.setItem('tVotes', res.length);
   })
}
vPresACount(){
    this.http.get<any>("http://localhost:3000/Votes?Vpresident=vpA").subscribe(res=>{
      localStorage.setItem('vpAcount', res.length);
     })
}
vPresBCount(){
    this.http.get<any>("http://localhost:3000/Votes?Vpresident=vpB").subscribe(res=>{
      localStorage.setItem('vpBcount', res.length);
    })
}
vPresCCount(){
  this.http.get<any>("http://localhost:3000/Votes?Vpresident=vpC").subscribe(res=>{
    localStorage.setItem('vpCcount', res.length);
  })
}
PresACount(){
  this.http.get<any>("http://localhost:3000/Votes?President=pA").subscribe(res=>{
    localStorage.setItem('pAcount', res.length);
   })
}
PresBCount(){
  this.http.get<any>("http://localhost:3000/Votes?President=pB").subscribe(res=>{
    localStorage.setItem('pBcount', res.length);
  })
}
PresCCount(){
this.http.get<any>("http://localhost:3000/Votes?President=pC").subscribe(res=>{
  localStorage.setItem('pCcount', res.length);
})
}
SecACount(){
  this.http.get<any>("http://localhost:3000/Votes?Secretary=sA").subscribe(res=>{
    localStorage.setItem('sAcount', res.length);
   })
}
SecBCount(){
  this.http.get<any>("http://localhost:3000/Votes?Secretary=sB").subscribe(res=>{
    localStorage.setItem('sBcount', res.length);
  })
}
SecCCount(){
this.http.get<any>("http://localhost:3000/Votes?Secretary=sC").subscribe(res=>{
  localStorage.setItem('sCcount', res.length);
})
}
presAchart(): number{
 this.presACount = localStorage.getItem("pAcount")
 this.totalVotes = localStorage.getItem("tVotes")
 this.presACount = Math.round(this.presACount/this.totalVotes*100)
 return this.presACount
}
presBchart(): number{
  this.presBCount = localStorage.getItem("pBcount")
  this.totalVotes = localStorage.getItem("tVotes")
  this.presBCount = Math.round(this.presBCount/this.totalVotes*100)
  return this.presBCount
 }
 presCchart(): number{
  this.presCCount = localStorage.getItem("pCcount")
  this.totalVotes = localStorage.getItem("tVotes")
  this.presCCount = Math.round(this.presCCount/this.totalVotes*100)
  return this.presCCount
 }
 vpresAchart(): number{
  this.vpresACount = localStorage.getItem("vpAcount")
  this.totalVotes = localStorage.getItem("tVotes")
  this.vpresACount = Math.round(this.vpresACount/this.totalVotes*100)
  return this.vpresACount
 }
 vpresBchart(): number{
   this.vpresBCount = localStorage.getItem("vpBcount")
   this.totalVotes = localStorage.getItem("tVotes")
   this.vpresBCount = Math.round(this.vpresBCount/this.totalVotes*100)
    // this.vPresBCount.slice(0,2)
   return this.vpresBCount
  }
  vpresCchart(): number{
   this.vpresCCount = localStorage.getItem("vpCcount")
   this.totalVotes = localStorage.getItem("tVotes")
   this.vpresCCount = Math.round(this.vpresCCount/this.totalVotes*100)
   return this.vpresCCount
  }
  secAchart(): number{
    this.secACount = localStorage.getItem("sAcount")
    this.totalVotes = localStorage.getItem("tVotes")
    this.secACount = Math.round(this.secACount/this.totalVotes*100)
    return this.secACount
   }
   secBchart(): number{
     this.secBCount = localStorage.getItem("sBcount")
     this.totalVotes = localStorage.getItem("tVotes")
     this.secBCount = Math.round(this.secBCount/this.totalVotes*100)
      // this.vPresBCount.slice(0,2)
     return this.secBCount
    }
    secCchart(): number{
     this.secCCount = localStorage.getItem("sCcount")
     this.totalVotes = localStorage.getItem("tVotes")
     this.secCCount = Math.round(this.secCCount/this.totalVotes*100)
     return this.secCCount
    }




}

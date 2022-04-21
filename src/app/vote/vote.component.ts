import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from '../shared/api.service';
import { VoteModel } from './vote.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  President = '';
  Vpresident = '';
  Secretary = '';
  voteobj : VoteModel = new VoteModel();

  constructor(private api : ApiService, private notification: NzNotificationService) { }

  ngOnInit(): void {
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

    })
  }

}

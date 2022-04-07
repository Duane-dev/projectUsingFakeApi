import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

 

  constructor(private fb: FormBuilder, private http : HttpClient, private router:Router, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }
  login(){
    this.http.get<any>("http://localhost:3000/users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.userName === this.validateForm.value.userName && a.password === this.validateForm.value.password
    });
    if(user){
      if(user.accountType == "Admin"){
        this.notification.success('success','Login Successful',{
          nzDuration: 2000,
          nzPauseOnHover: false,
          nzAnimate: true,

        })
        setTimeout(()=>{
        this.validateForm.reset();
        this.router.navigate(['welcome'])
        },2000);
      }else if(user.accountType == "User"){
        this.notification.success('success','Login Successful',{
          nzDuration: 2000,
          nzPauseOnHover: false,
          nzAnimate: true,
          
        })
        setTimeout(()=>{
        this.validateForm.reset();
        this.router.navigate(['dashboard'])
        },2000);
      }
    }else{
      this.notification.warning('warning','Unknown User',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,
        
      })
    }
   },err=>{
    this.notification.error('Error','Something Went Wrong',{
      nzDuration: 2000,
      nzPauseOnHover: false,
      nzAnimate: true,
      
    })
   })
  }
}

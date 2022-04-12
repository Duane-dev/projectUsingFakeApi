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
  checkStatus!: boolean;

  public localStorageItem(): boolean {
    if (localStorage.getItem("sessionUser") == "Admin" || localStorage.getItem("sessionUser") == "User") {
      return true
    } else {
      return false;
    };
  }

  constructor(private fb: FormBuilder, private http : HttpClient, private router:Router, private notification: NzNotificationService) {}

  ngOnInit(): void {
    this.checkStatus = this.localStorageItem();
    if(this.checkStatus == true){
      this.router.navigate(['welcome'])
    }
    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true]
    });
  }
  login(){
    this.http.get<any>("http://localhost:3000/users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.validateForm.value.email && a.password === this.validateForm.value.password
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
        localStorage.setItem('sessionUser', user.accountType);
        this.router.navigate(['welcome'])
        .then(()=>{
          window.location.reload();
        })
        },2000);
      }else if(user.accountType == "User"){
        this.notification.success('success','Login Successful',{
          nzDuration: 2000,
          nzPauseOnHover: false,
          nzAnimate: true,
          
        })
        setTimeout(()=>{
        this.validateForm.reset();
        localStorage.setItem('sessionUser', user.accountType);
        this.router.navigate(['welcome'])
        .then(()=>{
          window.location.reload();
        })
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

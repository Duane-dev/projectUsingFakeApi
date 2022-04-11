import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { accountManagementModel } from './account_management.model';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  userForm !: FormGroup;
  accountMManagementmodelObj : accountManagementModel = new accountManagementModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService, private notification: NzNotificationService) { }
  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      email : [''],
      password : [''],
      accountType : ['']
    })
    this.getAllUsers()
  }
  clickAddUser(){
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postUserDetails(){
    this.accountMManagementmodelObj.email = this.userForm.value.email;
    this.accountMManagementmodelObj.password = this.userForm.value.password;
    this.accountMManagementmodelObj.accountType = this.userForm.value.accountType;

    this.api.postUser(this.accountMManagementmodelObj)
    .subscribe(res=>{
      this.notification.success('success','Login Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
      this.userForm.reset();
      this.getAllUsers()
    },
    err=>{
      this.notification.success('success','Login Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
    })
  }
  getAllUsers(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    })
  }
  deleteUser(row : any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      this.notification.success('success','Login Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
      this.getAllUsers()
    })
  }
  onEdit(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.accountMManagementmodelObj.id = row.id;
    this.userForm.controls['email'].setValue(row.email),
    this.userForm.controls['password'].setValue(row.password),
    this.userForm.controls['accountType'].setValue(row.accountType)
  }
  updateUserDetails(){
    this.accountMManagementmodelObj.email = this.userForm.value.email;
    this.accountMManagementmodelObj.password = this.userForm.value.password;
    this.accountMManagementmodelObj.accountType = this.userForm.value.accountType;

    this.api.updateUser(this.accountMManagementmodelObj, this.accountMManagementmodelObj.id)
    .subscribe(res=>{
      this.notification.success('success','Login Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
      this.userForm.reset();
      this.getAllUsers()
    },
    err=>{
      this.notification.success('success','Login Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
    })
  }


}

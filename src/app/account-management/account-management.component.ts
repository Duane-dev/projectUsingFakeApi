import { Component, OnInit , EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { accountManagementModel } from './account_management.model';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { tap } from 'rxjs';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<DataItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
interface DataItem {
  id: number;
  email: string;
  password: string;
  accountType:string;
}
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.css']
})
export class AccountManagementComponent implements OnInit {
  userData !: any;
  userForm !: FormGroup;
  searchForm !: FormGroup;
  accountMManagementmodelObj : accountManagementModel = new accountManagementModel();
  pageStart :number = 0;
  pageEnd : number = 10; 
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService, private notification: NzNotificationService) { }
  ngOnInit(): void {
    this.searchForm = this.formbuilder.group({
      search : ['']
    })
    this.userForm = this.formbuilder.group({
      email : [''],
      password : [''],
      accountType : ['']
    })
    this.getAllUsers()
    console.log(this.getAllUsers())
  }
  clickAddUser(){
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
    
  }
  listOfColumns: ColumnItem[] = [
    {
      name: 'User ID',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'User Email',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: DataItem) => list.some(email => item.email.indexOf(email) !== -1)
    },
    {
      name: 'User Password',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.password.localeCompare(b.password),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
      ],
      filterFn: (list: string[], item: DataItem) => list.some(password => item.password.indexOf(password) !== -1)
    },
    {
      name: 'Account Type',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.accountType.localeCompare(b.accountType),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Admin', value: 'Admin', byDefault: true  },
        { text: 'User', value: 'User'}
      ],
      filterFn: (list: string[], item: DataItem) => list.some(accountType => item.accountType.indexOf(accountType) !== -1)
    }
  ];
  listOfData: DataItem[] = this.userData;
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
    return this.api.getUser().pipe(tap(res=> res.json()))
  }
  onPageIndexChange($event: number) {
    this.pageEnd = $event * 10;
    this.pageStart = ($event * 10) -10;
    this.getAllUsers()
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

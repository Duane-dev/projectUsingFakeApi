import { Component, OnInit , EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { accountManagementModel } from './account_management.model';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
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
  
  userForm !: FormGroup;
  searchForm !: FormGroup;
  accountMManagementmodelObj : accountManagementModel = new accountManagementModel();
  userData !: any;
  userPage !: any;
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
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: DataItem) => list.some(email => item.email.indexOf(email) !== -1)
    },
    {
      name: 'User Password',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.password.localeCompare(b.password),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
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
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim', byDefault: true }
      ],
      filterFn: (list: string[], item: DataItem) => list.some(accountType => item.accountType.indexOf(accountType) !== -1)
    }
  ];
  listOfData: DataItem[] = [
    {
      "id": 1,
      "email": "Plastic@gmail.com",
      "password": "Shirt",
      "accountType": "Admin"
    },
    {
      "id": 2,
      "email": "Generic@gmail.com",
      "password": "Compatible",
      "accountType": "Admin"
    },
    {
      "id": 3,
      "email": "Borders@gmail.com",
      "password": "Avon",
      "accountType": "User"
    },
    {
      "id": 4,
      "email": "SCSI@gmail.com",
      "password": "Coves",
      "accountType": "User"
    },
    {
      "id": 5,
      "email": "Phased@gmail.com",
      "password": "exploit",
      "accountType": "User"
    },
    {
      "id": 6,
      "email": "ADP@gmail.com",
      "password": "Borders",
      "accountType": "User"
    },
    {
      "id": 7,
      "email": "compress@gmail.com",
      "password": "state",
      "accountType": "User"
    },
    {
      "id": 8,
      "email": "Money@gmail.com",
      "password": "Plastic",
      "accountType": "Admin"
    },
    {
      "id": 9,
      "email": "Forest@gmail.com",
      "password": "Loan",
      "accountType": "User"
    },
    {
      "id": 10,
      "email": "New@gmail.com",
      "password": "extensible",
      "accountType": "User"
    },
  ];
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
        this.userPage = res.slice(this.pageStart,this.pageEnd);
      })
  }
  // search(){
  //   this.api.getUser()
  //   .subscribe(res=>{
  //     console.log(this.search())
  //       for (let index = 0; index < res.length; index++) {
          
  //         if(res[index].name == 'test')
  //         this.userData = res[index].name;
  //         console.log(this.userData)
  //         this.userPage = res.slice(this.pageStart,this.pageEnd);
  //       }      
  //   })
  // }
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

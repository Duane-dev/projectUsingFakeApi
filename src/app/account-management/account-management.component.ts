import { Component, OnInit , EventEmitter} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { accountManagementModel } from './account_management.model';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NzModalRef , NzModalService } from 'ng-zorro-antd/modal';
import Users from '../../../db.json';
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
  confirmModal?: NzModalRef;
  isVisible = false;
  userData : any = Users.Users;
  userForm !: FormGroup;
  accountMManagementmodelObj : accountManagementModel = new accountManagementModel();
  pageStart :number = 0;
  pageEnd : number = 10; 
  constructor(private formbuilder: FormBuilder, private api : ApiService, private notification: NzNotificationService, private modal: NzModalService) {}
  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      email : [''],
      password : [''],
      accountType : ['']
    })
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
  listOfData: DataItem[] = this.userData
  deleteUser(row : any){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.api.deleteUser(row.id)
          .subscribe(res=>{
           this.notification.warning('Deleted','User Deleted',{
           nzDuration: 2000,
           nzPauseOnHover: false,
           nzAnimate: true,
      })

    })
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
    
  }
  showModal(row : any){
    this.isVisible = true;
    this.accountMManagementmodelObj.id = row.id;
    this.userForm.controls['email'].setValue(row.email),
    this.userForm.controls['password'].setValue(row.password),
    this.userForm.controls['accountType'].setValue(row.accountType)
  }

  handleOk(): void {
    this.accountMManagementmodelObj.email = this.userForm.value.email;
    this.accountMManagementmodelObj.password = this.userForm.value.password;
    this.accountMManagementmodelObj.accountType = this.userForm.value.accountType;

    this.api.updateUser(this.accountMManagementmodelObj, this.accountMManagementmodelObj.id)
    .subscribe(res=>{
      this.notification.success('Updated','Update Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
      this.userForm.reset();

    },
    err=>{
      this.notification.error('Failed','Update Failed',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
    })
    this.isVisible = false;
  }
  okbutton():void{
    this.isVisible = false;
  }
  handleCancel(): void {

    this.isVisible = false;
  }




}

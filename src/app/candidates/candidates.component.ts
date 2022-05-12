import { Component, OnInit } from '@angular/core';
import { CandidatesModel } from './candidates.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  name: string;
  position: string;
  posCode: string;
}
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  confirmModal?: NzModalRef;
  isVisible = false;
  candidatesData : any = Users.Candidates;
  candidateForm !: FormGroup;
  candidatesmodelObj : CandidatesModel = new CandidatesModel();
  pageStart :number = 0;
  pageEnd : number = 10; 
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api : ApiService, private notification: NzNotificationService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.candidateForm = this.formbuilder.group({
      name : [''],
      position : [''],
      posCode : [''],
    })
  }
  listOfColumns: ColumnItem[] = [
    {
      name: 'Candidate ID',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.id - b.id,
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'Candidate Name',
      sortOrder: 'descend',
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      sortDirections: ['ascend','descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: false
    },
    {
      name: 'Candidate Position',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.position.localeCompare(b.position),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'President', value: 'President'  },
        { text: 'Vice-President', value: 'Vice-President'},
        { text: 'Secretary', value: 'Secretary'},
      ],
      filterFn: (list: string[], item: DataItem) => list.some(position => item.position.indexOf(position) !== -1)
    },
    {
      name: 'Position Code',
      sortOrder: null,
      sortFn: (a: DataItem, b: DataItem) => a.posCode.localeCompare(b.posCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [ ],
      filterFn: (list: string[], item: DataItem) => list.some(posCode => item.posCode.indexOf(posCode) !== -1)
    }
  ];
  listOfData: DataItem[] = this.candidatesData
  deleteCandidate(row : any){
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this.api.deleteCandidate(row.id)
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
  AddCandidate(){

    this.candidateForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.isVisible = true;
  }
  postCandidate(){
    this.candidatesmodelObj.name = this.candidateForm.value.name;
    this.candidatesmodelObj.position = this.candidateForm.value.position
    this.candidatesmodelObj.posCode = this.candidateForm.value.posCode;

    this.api.postCandidate(this.candidatesmodelObj)
    .subscribe(res=>{
      this.notification.success('Added','Candidate Added Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
      this.candidateForm.reset();

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
  
  showModal(row : any){
    this.showAdd = false;
    this.showUpdate = true;
    this.isVisible = true;
    this.candidatesmodelObj.id = row.id;
    this.candidateForm.controls['name'].setValue(row.name),
    this.candidateForm.controls['position'].setValue(row.position),
    this.candidateForm.controls['posCode'].setValue(row.posCode)
  }

  handleOk(): void {
    this.candidatesmodelObj.name = this.candidateForm.value.name;
    this.candidatesmodelObj.position = this.candidateForm.value.position
    this.candidatesmodelObj.posCode = this.candidateForm.value.posCode;
    console.log(this.candidatesmodelObj)
    this.api.updateCandidate(this.candidatesmodelObj, this.candidatesmodelObj.id)
    .subscribe(res=>{
      this.notification.success('Updated','Update Successful',{
        nzDuration: 2000,
        nzPauseOnHover: false,
        nzAnimate: true,

      })
      this.candidateForm.reset();

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

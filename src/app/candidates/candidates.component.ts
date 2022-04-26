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
  position: string;
  posCode: string;
}
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  candidatesData : any = Users.Candidates;
  candidateForm !: FormGroup;
  candidatesmodelObj : CandidatesModel = new CandidatesModel();
  pageStart :number = 0;
  pageEnd : number = 10; 
  constructor(private formbuilder: FormBuilder, private api : ApiService, private notification: NzNotificationService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.candidateForm = this.formbuilder.group({
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

}

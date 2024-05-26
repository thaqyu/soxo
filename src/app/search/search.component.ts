import { Component, OnInit ,Input , Output ,EventEmitter} from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

@Input() searchtable:any ;
@Output() passedEvent=new EventEmitter();
  constructor(public dataService: DataService) { }
data:string='child data';
  Type = "";
  Column = "";
  Value = "";

  types: any = [];
  ngOnInit(): void {
    this.BindType();
  }
PassEvent(){
  this.passedEvent.emit(this.data);
}
  Search(column :any,value :any){
    // this.passedEvent.emit(this.data);

      this.dataService.GetSearchbyType(this.searchtable,column,value).subscribe(result => {
        this.types = result;


    this.passedEvent.emit(this.types[0].id);


      }
      );


  }
  BindType() {
    this.types = this.dataService.Types;
  }
}

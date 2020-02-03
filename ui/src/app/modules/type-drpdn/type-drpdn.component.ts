import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../core/services/data.service'

@Component({
  selector: 'app-type-drpdn',
  templateUrl: './type-drpdn.component.html',
  styleUrls: ['./type-drpdn.component.css']
})
export class TypeDrpdnComponent implements OnInit {

  selectedType:string = 'Movie'
  @Input() typeList:string[];

  constructor(private DataService: DataService) { }

  ngOnInit() {
  }

  handleTypeClick(event:any){
      this.DataService.$handleTypeClick.emit(event);
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../app/core/services/data.service'
import { Inetflixdatalist } from '../app/core/interface/Inetflixdata'
import { Ipageinitdatalist } from '../app/core/interface/Ipageinitdatalist'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  netflixData =  {} as Inetflixdatalist;
  new_releases:string[];
  netflixType:string[];
  selectedType: string = 'Movie';
  searchtext:string;

  constructor(private DataService: DataService) {
    this.DataService.$handleTypeClick.subscribe((value) =>{
      this.selectedType = value;
      this.getdata();
    })
  }

  ngOnInit(){ 
 
    this.DataService.getPageInitData().subscribe((data:Ipageinitdatalist)=>{
      this.new_releases = data.new_releases;
      this.netflixType = data.netflixtypes;
      this.DataService.$netflixtypes.emit(this.netflixType);
      },err=>alert('Network Issue try Refreshing Page')
    );
    this.getdata();
  }
  

  getdata(){
    this.DataService.getNetflixData(this.selectedType).subscribe((data:Inetflixdatalist)=>{
      this.netflixData = data;
    },err=>{
      alert('Issue Loading Netflix Data')}, () => {
        this.DataService.$netflixdata.emit(this.netflixData);
    });
  }
}

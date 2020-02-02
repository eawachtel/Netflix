import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../app/core/services/data.service'
import { Inetflixdata, Inetflixdatalist } from '../app/core/interface/Inetflixdata'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


  netflixData =  {} as Inetflixdata;
  new_releases:any;
  netflixType:string[];
  selectedType: string = 'Movie';

  constructor(private DataService: DataService) {
    console.log('running handletypeclick in const')
    this.DataService.$handleTypeClick.subscribe((value) =>{
      this.selectedType = value;
      this.getdata();
    })
  }

  ngOnInit(){ 

    this.DataService.getPageInitData().subscribe((data:any)=>{
      this.new_releases = data.new_releases;
      this.netflixType = data.netflixtypes;
      this.DataService.$netflixtypes.emit(this.netflixType);
      },err=>alert('Network Issue try Refreshing Page')
    );
    this.getdata();
  }
  

  getdata(){
    this.DataService.getNetflixData(this.selectedType).subscribe((data:any)=>{
      this.netflixData = data;
      },err=>{
      alert('Issue Loading Netflix Data')}, () => {
        this.DataService.$netflixdata.emit(this.netflixData);
    });
  
  }
}

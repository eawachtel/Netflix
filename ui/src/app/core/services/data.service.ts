import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from "../../../environments/environment";
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService { 

  $netflixdata = new EventEmitter<any>();
  $netflixtypes = new EventEmitter<any>();
  $handleTypeClick = new EventEmitter<any>();
    
  public apiUrl = environment.appUrl;

  constructor(private _http: HttpClient) { }

  getPageInitData(){
    console.log('running getpageinitdata')
    return this._http.get(this.apiUrl + 'getpageinitdata');
  }

  getNetflixData(selectedType){
    var message = {selectedType: selectedType}
    return this._http.post(this.apiUrl + 'getnetflixdata', message);
  }

}

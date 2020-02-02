import { Component, OnInit, ViewEncapsulation, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { filterBy, FilterDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { FilterService } from '@progress/kendo-angular-grid';
import { DataService } from '../../core/services/data.service'
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';

const flatten = filter => {
  const filters = (filter || {}).filters;
  if (filters) {
    return filters.reduce((acc, curr) => acc.concat(curr.filters ? flatten(curr) : [curr]), []);
  }
  return [];
};

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  filter: CompositeFilterDescriptor;
  genericFilter: any[] = [];
  previousgenericFilter: CompositeFilterDescriptor[] = [];
  dataPersist: any;
  dataSorted: any;
  dataFiltered:any;
  pitColumns:any;
  private categoryFilter: any[] = [];
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;

  constructor(private DataService: DataService, private sanitizer: DomSanitizer) {
      this.DataService.$netflixdata.subscribe((data) => {
        this.dataPersist = data.data;
        this.pitColumns = data.column_names
        this.dataFiltered = this.dataPersist;
        this.loaddata();
      })

  }
  
  ngOnInit(){ }
  
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{
    field: 'title',
    dir: 'asc'
  }];

public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
}

private loadItems(): void {
   console.log(this.dataSorted.data)
    this.gridView = {
        data: this.dataSorted.data.slice(this.skip, this.skip + this.pageSize),
        total: this.dataSorted.data.length
    };
}
  
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loaddata();
  }
  
  private loaddata(): void {
    this.dataSorted = {
        data: orderBy(this.dataFiltered, this.sort),
        total: this.dataFiltered.length
    };
    this.loadItems();
  }
  
  public filterChange(filter: CompositeFilterDescriptor): void {

    let genFilter = filter.filters.map((f: CompositeFilterDescriptor) => {
      return f.filters.find((f: FilterDescriptor) =>
        f.field === 'CategoryID'
      ) as CompositeFilterDescriptor
    }).filter(x=> !!x)

    if (this.previousgenericFilter.length === 0 && genFilter.length > 0) {
      this.previousgenericFilter = genFilter
    }
    else if (this.previousgenericFilter.length > 0 && genFilter.length === 0) {
      this.previousgenericFilter = []
    }

    this.filter = filter;
    this.dataFiltered = filterBy(this.dataPersist, filter);
    this.sortChange(this.sort);
  }


  public genericChange(values: any[], filterService: FilterService, field:string): void {
    filterService.filter({
      filters: values.map(value => ({
        field: field,
        operator: 'eq',
        value
      })),
      logic: 'or'
    });
  }

    public genericFilters(filter: CompositeFilterDescriptor): FilterDescriptor[] {
    if(filter.filters.length>0){
    this.genericFilter.splice(
      0, this.genericFilter.length,
      ...flatten(filter).map(({ value }) => value)
    );
    return this.genericFilter
    }
  }

  public pitChange(values: any[], field: any){
    var result= this.dataSorted.data.filter((item)=>item[field]===values[0])
  }

  pitFilters(filter: any, name:any) {
    this.categoryFilter.splice(
      0, this.categoryFilter.length,
      ...flatten(filter).map(({ value }) => value)
    );
    return this.categoryFilter;
  }

}

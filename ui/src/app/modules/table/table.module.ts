import { TableComponent } from './table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule, ExcelModule  } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    GridModule,
    FormsModule,
    DropDownsModule,
    HttpClientModule,
    ExcelModule
  ],
  exports: [TableComponent]
})
export class TableModule { }

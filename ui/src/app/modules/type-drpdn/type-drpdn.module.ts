import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TypeDrpdnComponent } from './type-drpdn.component';



@NgModule({
  declarations: [TypeDrpdnComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DropDownsModule,
    FormsModule
  ],
  exports:[TypeDrpdnComponent]
})
export class TypeDrpdnModule { }

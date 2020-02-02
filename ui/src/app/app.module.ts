import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { GridLayoutModule } from '../app/modules/grid-layout/grid-layout.module'
import { TypeDrpdnModule } from '../app/modules/type-drpdn/type-drpdn.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GridModule,
    FormsModule,
    DropDownsModule,
    HttpClientModule,
    LayoutModule,
    GridLayoutModule,
    TypeDrpdnModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { DataService } from "./dataService";
import { UploadChartComponent } from './upload-chart/upload-chart.component';
import { ChartComponent } from './chart/chart.component';
import { AutoSuggestComponent } from './auto-suggest/auto-suggest.component';
import { DebounceKeyUpDirective, DebounceDirective } from './directives'

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    UploadChartComponent,
    ChartComponent,
    AutoSuggestComponent,
    DebounceKeyUpDirective,
    DebounceDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([{
      path: "charts",
      component: UploadChartComponent
    }, {
      path: "charts/:uid",
      component: ChartComponent
    }, { 
      path: '**', 
      component: UploadChartComponent
    }])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

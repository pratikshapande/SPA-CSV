import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-auto-suggest',
  template: `
            <input [ngModel]='model' (ngModelChange)='changed($event)'/>
            <br/>{{model}}<br/>

            <input [ngModel]='model2' (ngModelChange)='method2($event)'/>
            <br/>{{model2}}<br/>

            <input debounceKeyUp (debounceKeyUps)="log($event)" [debounceTime]="2000" />
            <br/>{{model3}}<br/>

            <input [(ngModel)]="model4" [debounce]="5000" (onDebounce)="doSomethingWhenModelIsChanged()">
            <br/>{{model4}}<br/>
            `,
  styleUrls: ['./auto-suggest.component.css']
})
export class AutoSuggestComponent implements OnInit {
  model: string = "siva";
  model2: string = "kumar";
  model3: string = "";
  model4: string = "";
  modelChanged: Subject<string> = new Subject<string>();
  method2: Function;

  ngOnInit() {
  }

  constructor() {
      this.method2 = this.debounce(this.changed2, 2000); 
      this.modelChanged
          .debounceTime(1000)
          .subscribe(model => this.model = model);
  }

  changed(text: string) {
      this.modelChanged.next(text);
  }

  changed2(e) {
    this.model2 = e;
  }

  log(e) {
    this.model3 = e.target.value;
  }

  doSomethingWhenModelIsChanged() {
    console.log("Changed...");
  }

  debounce(func, wait) {
	  var timer = null;
	  return function() {
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        if(timer) clearTimeout(timer);
      
        timer = setTimeout(() => {
          timer = null;
          func.apply(self, args);
        }, wait);
    }.bind(this);
  }
}

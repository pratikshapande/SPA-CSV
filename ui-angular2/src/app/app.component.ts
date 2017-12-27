import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { DataService } from './dataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	constructor() {}
	ngOnInit() {}
}

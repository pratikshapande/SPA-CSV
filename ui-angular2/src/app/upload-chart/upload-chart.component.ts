import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { DataService } from '../dataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-chart',
  templateUrl: './upload-chart.component.html',
  styleUrls: ['./upload-chart.component.css']
})
export class UploadChartComponent implements OnInit {
  options;
	dataSets: any[] = [];
	data: any[] = [];

	constructor(private http: Http, private dataService: DataService, private router: Router) {}

	ngOnInit() {
		this.dataService.getChartDataSets().subscribe((data) => {
			this.dataSets = data;
		});
	}

	openChart(index) {
		this.router.navigate(['/chart', this.dataSets[index]]);
	}

	changeListener(event) {
    	let filesList = event.target.files;
		if(filesList.length > 0) {
			let file = filesList[0];

			var reader = new FileReader();
			reader.onload = (e) => {
				let chartData = this.csvJSON(e.target["result"]);
				this.dataService.saveChartDataSet(chartData).subscribe((data) => {
					this.dataSets.push(data.uid);
				});
			};
			reader.readAsText(file, "UTF-8");
		} else {
			alert("Select any csv file");
		}
	}

	csvJSON(csv) {
  		var lines = csv.split("\n");
  		
		var result = [];
		for(let i = 0, iLen = lines.length; i < iLen; i++) {
			let columns = lines[i].split(",");
			let series = [];
			for(let j = 1, jLen = columns.length; j < jLen; j++) {
				let data = columns[j].split("|");
				series.push({
					"year": data[0],
					"score": data[1]
				});
			}

			let obj = {};
			obj["key"] = columns[0];
			obj["values"] = series.sort((a, b) => {
				if(a["year"] > b["year"]) {
					return 1;
				} else if(a["year"] < b["year"]) {
					return -1;
				} else {
					return 0;
				}
			});
			result.push(obj);
		}
		
		return result;
	}

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../dataService';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  uid: string;
  private sub: any;
  data: any[] = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.dataService.getChartDataSet(params.uid).subscribe(data => {
        if(data.length) {
          this.uid = data[0].uid;
          this.data = data[0].dataSet;
        }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

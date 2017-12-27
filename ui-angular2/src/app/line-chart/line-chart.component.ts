import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() data: any;

  svg: any;
  margin =  {
    top: 20,
    right: 80,
    bottom: 30,
    left: 50
  };
  xValues;
  width: number;
  height: number;
  g: any;
  x;
  y;
  z;
  line;

  constructor() {}

  ngOnInit() {
    // Get only values arrays
    let t = this.data.map(function(v) {
      return v.values.map(function(d) {
        return d.year;
      })
    });
    // Merge all values arrays to find all possible x-axis values
    this.xValues = t.reduce(function(prev, curr) {
      var concatenated = prev.concat(curr).filter((a, i, arr) => {
        return arr.indexOf(a) === i;
      });;
      return concatenated.sort((a,b) => {
        return a - b;
      });
    }, []);

    this.initChart();
    this.drawAxis();
    this.drawPath();
  }

  initChart() {
    this.svg = d3.select("svg");
    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3Scale.schemeCategory10);

    this.line = d3Shape.line()
                       .x( (d: any) => this.x(d.year))
                       .y( (d: any) => this.y(d.score) );

    this.x.domain(d3Array.extent(this.xValues, function(d) {
      return d;
    }));

    this.y.domain([
      d3Array.min(this.data, function(c) { return d3Array.min(c.values, function(d) { return d.score; }); }),
      d3Array.max(this.data, function(c) { return d3Array.max(c.values, function(d) { return d.score; }); })
    ]);

    this.z.domain(this.data.map(function(c) { return c.key; }));
  }

  private drawAxis(): void {
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Score");
  }

  private drawPath(): void {
    let score = this.g.selectAll(".score")
      .data(this.data)
      .enter().append("g")
      .attr("class", "score");

    score.append("path")
      .attr("class", "line")
      .attr("d", (d) => this.line(d.values) )
      .style("stroke", (d) => this.z(d.key) )
      .style("fill", "none");

    score.append("text")
      .datum(function(d) { return {id: d.key, value: d.values[d.values.length - 1]}; })
      .attr("transform", (d) => "translate(" + this.x(d.value.year) + "," + this.y(d.value.score) + ")" )
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif")
      .text(function(d) { return d.id; });
  }
}

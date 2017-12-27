import React from 'react';
import { APIService } from './APIService';
import { ReactD3LineChart } from './react-d3-charts/react-d3-line-chart';

export class Chart extends React.Component {
	constructor(props) {
		super(props);
        this.uid = props.match.params.uid;

        this.state = {
            uid: this.uid,
			data: []
		};

        this.chart = "";

        // Singleton class instance
		this.apiService = new APIService();
        this.apiService.getChartDataSet(this.uid).then(res => {
            this.setState({
				data: res[0].dataSet
			})
        })
	}

    componentDidMount() {}

	render () {
        let template;
        if(!this.state.data.length) {
            template = (
                <div>
                    <h2 style={{textAlign: 'center'}}> Line Chart (Data Set - {this.uid}) </h2>
                </div>
            );
        } else {
            template = (
                <div>
                    <h2 style={{textAlign: 'center'}}> Line Chart (Data Set - {this.uid}) </h2>
                    <ReactD3LineChart data={this.state.data} size={[960, 500]}></ReactD3LineChart>
                </div>
            );
        }
		return template;
	}
};
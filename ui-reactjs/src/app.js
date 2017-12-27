import React from 'react';
import { render, ReactDOM } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { APIService } from './APIService';
import { Chart } from './Chart';

const App = () => (
	<Router>
		<div>
			<Route exact path="/" component = {Home}/>
			<Route path="/chart/:uid" component = {Chart}/>
		</div>
	</Router>
);

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSets: []
		};
		this.uploadCSV = this.uploadCSV.bind(this);
		this.csvJSON = this.csvJSON.bind(this);

		// Singleton class instance
		this.apiService = new APIService();

		this.apiService.getChartDataSets().then(data => {
			this.setState({
				dataSets: data
			})
		});
  	}

	componentDidMount() {}

	uploadCSV(event) {
		let filesList = event.target.files;
		if(filesList.length > 0) {
			let file = filesList[0];

			var reader = new FileReader();
			reader.onload = (e) => {
				let chartData = this.csvJSON(e.target["result"]);

				this.apiService.storeChartDataSet(chartData).then((data) => {
					this.setState(prevState => ({
						dataSets: [...prevState.dataSets, data.uid]
					}));
				});

				// Clear the previously selected file
				this.refs.upload.value = "";
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

  	render () {
		return (
			<div className="container">
				<div className="uploadCntnr">
					<input type="file" name="file" ref="upload" id="file" className="inputfile" 
						accept=".csv" onChange={this.uploadCSV}/>
					<label htmlFor="file">Upload CSV File</label>
				</div>

				<div className="chartLinksCntnr">
					<h2> Charts ({this.state.dataSets.length})</h2>

					{this.state.dataSets.map(dataSet => (
						<div className="chartLink" key={dataSet}>
							<Link to={`${this.props.match.url}chart/${dataSet}`}> 
								Data Set - {dataSet}
							</Link>
						</div>
					))}
				</div>
			</div>
		);
  	}
}

render(<App/>, document.getElementById('app'));
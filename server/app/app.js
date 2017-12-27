/*
$ mongoimport --db test --collection restaurants 
    --drop --file ~/Downloads/primer-dataset.json

$ mongod
$ mongo
$ use <database_name>
$ db.restaurants.find()
$ db.restaurants.find({"borough": "Bronx"})
*/

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all("/api/*", function(req, res, next) {
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, domain");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	next();
});

var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/test", { useMongoClient: true });
var db = mongoose.connection;
db.once("open", function() {
	console.log("Mongo DB Connected");
});

var Chart = require("./models/chartModel");

var chartsRouter = express.Router();
chartsRouter.route("/charts")
	.get(function(req, res) {
		var query = req.query;
		Chart.find(query, function(err, charts) {
			if(err) {
				console.log(err);
			} else {
				if(Object.keys(query).length == 0) {
					res.json(charts.map((item) => item.uid));
				} else {
					res.json(charts);
				}
			}
		});
	})
	.post(function(req, res) {
		var params = req.body;
		var data = {
			uid: "" + new Date().getTime(),
			dataSet: params
		};
		var chart = new Chart(data);
		chart.save();
		res.json(data);
	})
	.delete(function(req, res) {
		Chart.remove({}, function() {
			res.json({});
		});
	});

app.use("/api", chartsRouter);

app.listen(port, function() {
	console.log("Server is listening on port: " + port);
});


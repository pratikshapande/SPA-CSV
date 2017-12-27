var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var ChartData = new Schema({
    year: String,
    score: String
});

var DataSeries = new Schema({
    key: String,
    values: [ChartData]
});

var ChartModel = new Schema({
    uid: String,
    dataSet: [DataSeries]
});

module.exports = mongoose.model("Chart", ChartModel);
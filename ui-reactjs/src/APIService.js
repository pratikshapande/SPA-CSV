let instance = null;

export class APIService {
    constructor() {
        if(!instance) {
            instance = this;
        }
        this.baseURL = "http://localhost:8000/api/";

        return instance;
    }

    getChartDataSets() {
		return fetch(this.baseURL + "charts", {
			method: "GET"
		}).then(d => d.json());
	}

    getChartDataSet(uid) {
        return fetch(`${this.baseURL}charts?uid=${uid}`, {
            method: "GET"
        }).then(d => d.json());
    }

    storeChartDataSet(chartDataSet) {
        return fetch(this.baseURL + "charts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chartDataSet)
        }).then(d => d.json());
    }
}
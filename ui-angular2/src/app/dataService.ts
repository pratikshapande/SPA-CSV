import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';

@Injectable()
export class DataService {
    baseURL: string = "http://localhost:8000/api/";
    dataSets: any[];    

    constructor(private http: Http) {}

    getChartDataSets() {
        return this.http.get(this.baseURL + "charts")
                            .map(res => res.json());
    }

    getChartDataSet(uid: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('uid', uid);

        let options = new RequestOptions();
        options.search = params;

        return this.http.get(this.baseURL + "charts", options).map(res => res.json());
    }

    saveChartDataSet(data) {
        return this.http.post(this.baseURL + "charts", data, {
            withCredentials: false
        }).map(res => res.json());
    }
}
import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

import {Platform, LoadingController} from 'ionic-angular';
//import { Geolocation } from 'ionic-native';

@Injectable()
export class List {  
	public data;
	public url = 'data.json';
	public platform;
	public currentLocation;
	
    constructor(private http: Http, platform: Platform, public loading: LoadingController) {
		this.platform = platform;

		//this.initializeMap();
    }

    getHotelList(currentLocation) {
		  let loader = this.loading.create({
			content: 'Getting nearest hotels...',
		  });
  
		  this.currentLocation = currentLocation;
        	// don't have the data yet
		  return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			//Chandigarh coordinates 30.7333, 76.7794
			//My Place 30.7334026, 76.7796079
			if(this.currentLocation == '39.9526, 75.1652')
				this.url = 'data2.json';
			else if(this.currentLocation == '30.7334026, 76.7796079')
				this.url = 'data3.json';
			loader.present().then(() => {
			this.http.get(this.url)
			  .map(res => res.json())
			  .subscribe(data => {
				// we've got back the raw data, now generate the core schedule data
				// and save the data for later reference
				//alert(JSON.stringify(data));
				loader.dismiss();
				this.data = data;
				resolve(this.data);
			  });
			 });
		  });
    }
	
}
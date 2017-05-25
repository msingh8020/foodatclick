import { Component } from "@angular/core";  
import { List } from '../../services/list';
import {MapPage} from '../mapPage/mapPage';

import {Platform} from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [List]
})
export class HomePage { 
	mapPage = MapPage;
    public foundRepos;
    public username;
	
	public platform;
	public currentLocation;

    constructor(private hotelsList: List, platform: Platform) {
		this.foundRepos = this.hotelsList.getHotelList(this.currentLocation);
		this.platform = platform;
		this.initializeMap();
		
    }

    getHotelList() {
        this.foundRepos = this.hotelsList.getHotelList(this.currentLocation);
    }
	
	initializeMap() {
 
		this.platform.ready().then(() => {
	 
			let locationOptions = {timeout: 10000, enableHighAccuracy: true};
	 
			navigator.geolocation.getCurrentPosition(
	 
				(position) => {
					//alert(JSON.stringify(position));
					
					//let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					let latLng = position.coords.latitude+', '+position.coords.longitude;
					this.currentLocation = latLng;
					this.getHotelList();
					/*let options = {
					  center: latLng,
					  zoom: 16,
					  mapTypeId: google.maps.MapTypeId.ROADMAP
					}
	 
					this.map = new google.maps.Map(document.getElementById("map_canvas"), options);
					*/
				},
	 
				(error) => {
					console.log(error);
				}, locationOptions
	 
			);
 
		});
	}
}
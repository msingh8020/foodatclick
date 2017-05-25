import {Component} from "@angular/core";
import {Platform} from 'ionic-angular';
//import { Geolocation } from 'ionic-native';

@Component({
    selector: 'page-mapPage',
    templateUrl: 'mapPage.html',
})
export class MapPage {
	public platform;
	public currentLocation;
	constructor(platform: Platform) {
		this.platform = platform;

		this.initializeMap();    
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
alert(latLng);
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

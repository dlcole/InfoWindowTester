// Import required core modules 
import { Frame } from '@nativescript/core';
import { Label } from '@nativescript/core';
import { StackLayout } from "@nativescript/core/";

export function onNavigatingTo(args) {
  const page = args.object;
  page.bindingContext = page.navigationContext.bindingContext;
} 

export function onBackTap(args) {
  Frame.topmost().goBack();
}

export function onMapReady(args) {
  let map = args.map; //GoogleMap object 

  // Add map markers 
  const airports = {
    "CLT": {
      code: "CLT",
      name: "Charlote Douglas International Airport",
      location: "Charlotte, NC",
      elevation: "748'",
      lat: 35.2163, 
      lng: -80.9539,
    },
    "RDU": {
      code: "RDU",
      name: "Raleigh-Durham International Airport",
      location: "Wake County, NC",
      elevation: "436'",
      lat: 35.7796,
      lng: -78.6382,
    },
  }

  for (let code in airports) { 
    let airport = airports[code];
    let markerOptions = {
      position: { lat: airport.lat, lng: airport.lng },
      title: airport.code,
      snippet: airport.name,
      userData: {
        elevation: airport.elevation, 
        location: airport.location,
      },
    };

    map.addMarker(markerOptions);

  } 

} // end onMapReady

/**
 Handle MarkerInfoContents event; prepare view for custom infoWindow
 * @see https://github.com/NativeScript/plugins/issues/564
 * @see https://developers.google.com/maps/documentation/android-sdk/infowindows
 * @see https://developers.google.com/maps/documentation/ios-sdk/infowindows
 * @param {*} args 
 */
export function onMarkerInfoContents(args) {

  const mapView = args.object;
  const marker = args.marker;
  console.log("onMarkerInfoContents...");

  try {
      const info = new StackLayout();

      let title = new Label();
      title.text = marker.title;
      title.textWrap = "true";
      title.style = "color: Blue; font-weight: bold; text-align: center; margin: 2,2,0,2; padding: 0; font-size: 20;"; 
      info.addChild(title);

      const snippet = new Label();
      snippet.text = marker.snippet;
      snippet.textWrap = "true";
      snippet.style = "color: Black; font-weight: bold; text-align: center; margin: 0,2,0,2; padding: 0; font-size: 16;"; 
      info.addChild(snippet);

      const location = new Label();
      location.text = marker.userData.location;
      location.textWrap = "true";
      location.style = "color: Gray; font-weight: normal; text-align: left; margin: 0,2,0,2; padding: 0; font-size: 14;"; 
      info.addChild(location);

      const elevation = new Label();
      elevation.text = "Elevation: " + marker.userData.elevation;
      elevation.textWrap = "true";
      elevation.style = "color: Gray; font-weight: normal; text-align: left; margin: 0,2,0,2; padding: 0; font-size: 14;"; 
      info.addChild(elevation);

      args.view = info;
   
  } catch (e) {
    console.log("onMarkerInfoContents error: " + e)
    debugger;
  }

} // end onMarkerInfoContents

export function onInfoWindowTap(args) {

  args.marker.hideInfoWindow();

} // end onInfoWindowTap

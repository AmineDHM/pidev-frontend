import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { environment } from "../../../../environments/environment";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as mapboxgl from "mapbox-gl";

export interface CoordinatesType {
  lat: number;
  lon: number;
}

@Component({
  selector: "ngx-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  map: mapboxgl.Map;
  style = "mapbox://styles/mapbox/streets-v11";
  lat = 34.22;
  lng = 9.51;
  /* coordinates: CoordinatesType = { lat: 0, lon: 0 }; */
  geocoder: MapboxGeocoder;
  marker: mapboxgl.Marker;
  geolocate: mapboxgl.GeolocateControl;

  @Output() coordinates: EventEmitter<CoordinatesType> = new EventEmitter();

  onDragEnd(event) {
    let data: CoordinatesType = {
      lat: event.target.getLngLat().toArray()[0],
      lon: event.target.getLngLat().toArray()[1],
    };
    this.coordinates.emit(data);
  }

  constructor() {}

  ngOnInit() {
    //Initilize the map
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: "map",
      style: this.style,
      zoom: 5,
      center: [this.lng, this.lat],
    });

    //Initilize the marker
    this.marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);

    //Initilize the geocoder
    this.geocoder = new MapboxGeocoder({
      accessToken: environment.mapbox.accessToken,
      mapboxgl: mapboxgl,
      language: "en-US",
    });

    //Initilize the geolocater
    this.geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    // Add map controls
    this.map.addControl(this.geocoder, "top-right");
    this.map.addControl(this.geolocate, "top-left");
    this.map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    //Marker draggin listener
    this.marker.on("dragend", this.onDragEnd.bind(this));
  }
}

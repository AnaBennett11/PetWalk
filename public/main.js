import { loadGoogleMaps } from "./utils.js";

let map;
let infoWindow;

function initMap () {
  console.log("hello, hi this is a test");
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });

  infoWindow = new google.maps.InfoWindow(); // Initialize infoWindow

  // Add a marker for user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(userPos);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: userPos,
          map: map,
          title: "Your Location",
        });

        // Define the LatLng coordinates for the outer path based on user's location
        const outerCoords = [
          { lat: userPos.lat - 0.05, lng: userPos.lng - 0.05 },
          { lat: userPos.lat + 0.05, lng: userPos.lng - 0.05 },
          { lat: userPos.lat + 0.05, lng: userPos.lng + 0.05 },
          { lat: userPos.lat - 0.05, lng: userPos.lng + 0.05 },
        ];

        // Create the polygon
        const polygon = new google.maps.Polygon({
          paths: [outerCoords],
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });

        // Add the polygon to the map
        polygon.setMap(map);
      },
   
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;

loadGoogleMaps(initMap);

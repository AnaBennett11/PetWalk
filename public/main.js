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

        // Initialize the Drawing Manager
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ["polygon"],
          },
          polygonOptions: {
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          },
        });

        // Add the Drawing Manager to the map
        drawingManager.setMap(map);

        // Add an event listener for the completion of the polygon drawing
        google.maps.event.addListener(
          drawingManager,
          "polygoncomplete",
          function (polygon) {
           console.log("Polygon completed:", polygon);
            let geocoder = new google.maps.Geocoder();
            let zipCodes = new Set(); // Use a set to avoid duplicate zip codes
            let polygonCoords = polygon.getPath().getArray();

            polygonCoords.forEach((latLng, index) => {
              geocoder.geocode({ location: latLng }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK && results) {
                  results.forEach(result => {
                    result.address_components.forEach(component => {
                      if (component.types.includes("postal_code")) {
                        zipCodes.add(component.long_name);
                      }
                    });
                  });
                  if (index === polygonCoords.length - 1) {
                    // Log zip codes once all points are processed
                    console.log("Zip Codes inside the polygon:", Array.from(zipCodes));
                  }
              } else {
                console.error("Geocode was not successful for the following reason:",status);
                   console.error("Geocoding request failed with the following results:",results);
              }
            });
            });
          }
        );
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

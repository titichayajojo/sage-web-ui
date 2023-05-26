import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 13.729889, // Replace with your desired initial latitude
  lng:  100.778194, // Replace with your desired initial longitude
};

const mapStyle = [
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];

const options = {
  styles: mapStyle, // Apply the custom map style
};


const Map = ({ locations, hospitalLocation }) => {
  console.log("LOC:", hospitalLocation);
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={hospitalLocation} zoom={10} options={options}>
      {hospitalLocation && (
      <Marker
        position={hospitalLocation}
        icon={{
          url: "https://maps.google.com/mapfiles/kml/shapes/hospitals.png", // Replace with the URL or path to your custom "here" marker icon
          scaledSize: new window.google.maps.Size(32, 32), // Adjust the size of the marker icon
        }}
      />
    )}
        {locations.map((location, index) => (
          
          <Marker
            key={index}
            position={{
              lat: parseFloat(location.latitude),
              lng: parseFloat(location.longitude),
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

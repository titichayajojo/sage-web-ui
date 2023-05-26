import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 37.7749, // Replace with your desired initial latitude
  lng: -122.4194, // Replace with your desired initial longitude
};

const Map = ({ locations }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
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

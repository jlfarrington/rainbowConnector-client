import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import L from 'leaflet'

interface MapProps {
  token: string | null;
  lat: string | null;
  long: string | null;
  getRainbows: () => void;
}

const position: LatLngTuple = [40.4389888, -86.91712];
const rainbowIcon = L.Icon.extend({
  options: {
    iconUrl: './rainbow-icon.png',
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon',
    createIcon: null
  }
})

export default class Map extends Component<MapProps> {
  componentDidMount() {
    this.props.getRainbows();
  }





  render() {
    return (
      <>
        <h1>I'm the map</h1>
        <MapContainer id="mapId" center={position} zoom={6} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>
              Here's where the rainbow info will go.
            </Popup>
          </Marker>
        
        </MapContainer>
      </>
    );
  }
}

import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import L from "leaflet";
import customIcon from "../rainbow-icon.png";

import "./Map.css";

interface MapProps {
  token: string | null;
  lat: number
  long: number
}

interface MapState {
  rainbowData: Array<Rainbow> | null
  userPosition: LatLngTuple
}

interface Rainbow {
  id: number;
  image: string;
  likes: number;
  lat: number;
  long: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

const rainbowIcon = L.icon({
  iconUrl: customIcon,
  iconSize: [50, 50], // size of the icon
  shadowSize: [10, 10], // size of the shadow
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  shadowAnchor: [0, 0], // the same for the shadow
  popupAnchor: [0, -10], // point from which the popup should open relative to the iconAnchor
});

export default class Map extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props)
    this.state = {
      rainbowData: null,
      userPosition: [this.props.lat, this.props.long]
    }
  }
  
  getRainbows = (): void => {
    if (this.props.token) {
      fetch("http://localhost:3000/rainbow/", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            rainbowData: data
          });
        });
    }
  };

  componentDidMount() {
    this.getRainbows();
  }

  render() {
    return (
      <>
      
        <h1>I'm the map</h1>
        <MapContainer
          id="mapId"
          center={this.state.userPosition}
          zoom={5}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.rainbowData?.map((rainbow, index) => {
            let position: LatLngTuple = [rainbow.lat, rainbow.long];
            return (
              <Marker position={position} icon={rainbowIcon} key={index}>
                <Popup>
                    <h2>Rainbow Title</h2>
                    <p>Likes on this rainbow : {rainbow.likes}</p>
                  
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </>
    );
  }
}

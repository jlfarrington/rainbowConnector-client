import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  MapConsumer
} from "react-leaflet";
import { LatLngTuple, LeafletMouseEvent } from "leaflet";
import L from "leaflet";
import customIcon from "../rainbow-icon.png";
import $ from "jquery";

import { Modal } from "antd";

import './Map.css'

interface MapProps {
  token: string | null;
  lat: number;
  long: number;
}

interface MapState {
  rainbowData: Array<Rainbow> | null;
  userPosition: LatLngTuple;
  selectedPosition: LatLngTuple;
  modalVisible: boolean;
  modalText: any;
  confirmLoading: boolean;
  userRainbow: string;
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

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CLOUD_URL =
  "https://api.cloudinary.com/v1_1/rainbowconnector/image/upload";

export default class Map extends Component<MapProps, MapState> {
  constructor(props: MapProps) {
    super(props);
    this.state = {
      rainbowData: null,
      userPosition: [this.props.lat, this.props.long],
      selectedPosition: [0, 0],
      modalVisible: false,
      modalText: "content",
      confirmLoading: false,
      userRainbow: "#"
    };
  }
  componentDidMount() {
    let token = localStorage.getItem('token')
    this.getRainbows(token);
  }


  getRainbows = (token: string | null): void => {
    if (token) {
     
      fetch("http://localhost:3000/rainbow/", {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({
            rainbowData: data,
          });
        });
    }
  };


  likeRainbow = (rainbow: Rainbow): void => {
    if (this.props.token) {
      let newLikes = rainbow.likes + 1
      fetch(`http://localhost:3000/rainbow/${rainbow.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",'Authorization': this.props.token}, body: JSON.stringify({
            rainbow: {
            image: rainbow.image,
            likes: newLikes,
            lat: rainbow.lat,
            long: rainbow.long,
          }})
         }) .then(response => console.log(response.json()))
    }
    this.getRainbows(this.props.token);
  }

 
  reportRainbow = async (e: any): Promise<any> => {
    e.preventDefault();
    if (this.props.token) {
      const response = await fetch("http://localhost:3000/rainbow/cloudsign", {
        method: "GET",
        headers: {
          Authorization: this.props.token,
        },
      });

      const { sig, ts } = await response.json();
      
      
      const file = document.getElementById("file-input").files[0];
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "euqfw3n3");
      formData.append("api_key", "118619554811256");
      formData.append("signature", sig);
      formData.append("timestamp", ts);

      const results = await (
        await fetch(CLOUD_URL, {
          method: "POST",
          body: formData,
        })
      ).json();

      console.log(results);

      if (results) {
        this.setState({
          userRainbow: results.secure_url,
        });
        console.log(this.state.userRainbow);
        const final = await (
          await fetch("http://localhost:3000/rainbow/report", {
            method: "POST",
            headers: {
              Authorization: this.props.token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              rainbow: {
                image: this.state.userRainbow,
                likes: 0,
                lat: this.state.selectedPosition[0],
                long: this.state.selectedPosition[1],
              },
            }),
          })
        ).json();
      }

      
    }
    this.getRainbows(this.props.token);
  };
  

  // MODAL FUNCS

  showModal = (): void => {
    if (!this.state.modalVisible) {
      this.setState({
        modalVisible: true,
      });
    }
    console.log("modal triggered");
  };

  handleOk = (): null => {
    if (!this.state.confirmLoading) {
      this.setState({
        confirmLoading: true,
      });
      this.forceUpdate();
    }
    setTimeout(() => {
      this.setState({
        modalVisible: false,
        confirmLoading: false,
      });
    }, 2000);
    return null
  };

  handleCancel = (): void => {
    console.log("clicked cancel button");
    if (this.state.modalVisible) {
      this.setState({
        modalVisible: false,
      });
    }
  };

  normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    return (
      <div className="mapWrapper">
        <MapContainer
          id="mapId"
          center={this.state.userPosition}
          zoom={5}
          scrollWheelZoom={true}
          style={{width: "device-width", height: "device-height"}}
        >

          <MapConsumer>
            {(map) => {
              map.on("click", (e: LeafletMouseEvent) => {
                let theMarker: L.Layer;
                const { lat, lng } = e.latlng;
                this.setState({
                  selectedPosition: [lat, lng],
                });
                console.log(
                  "you clicked the map at LAT: " + lat + "and LONG: " + lng
                );

                theMarker = L.marker([lat, lng], {
                  icon: rainbowIcon,
                });

                let popupContent = `
                <div className="reportPopup"><button class="delete-button">Report a Rainbow!</button></div>`;

                theMarker.bindPopup(popupContent).on("popupopen", () => {
                  $(".delete-button").on("click", (e) => {
                    e.preventDefault();
                    this.showModal();
                  });
                });
                theMarker.addTo(map);
                theMarker.openPopup();

                map.on("click", (e: LeafletMouseEvent) => {
                  if (theMarker != undefined) {
                    theMarker.removeFrom(map);
                  }
                });
              });
              return null;
            }}
          </MapConsumer>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
         <MapConsumer>
            {(map) => {
              this.state.rainbowData?.map((rainbow, index) => {
                let position: LatLngTuple = [rainbow.lat, rainbow.long];
                let rainbowMarker: L.Layer;
                rainbowMarker = L.marker(position, {
                  icon: rainbowIcon,
                })

                let popupContent = `<div id="rainbowPopup"><img src=${rainbow.image} width="250px" key=${index} />
                <div id="rainbowDetails"><button class="delete-button" id="likeBtn">Like</button> Likes: ${rainbow.likes}</div> </div>`
                
                const theRainbow = rainbow;

                rainbowMarker.bindPopup(popupContent).on("popupopen", () => {
                  $(".delete-button").on("click", (e) => {
                    e.preventDefault();
                    this.likeRainbow(theRainbow);
                    rainbowMarker.closePopup()

                  })
                })
                rainbowMarker.addTo(map);
                
            })
            return null
            }}


         </MapConsumer>
         
         
         
         
          
        </MapContainer>

        <Modal
          title="Report a Rainbow"
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <form encType='multipart/form-data' onSubmit={this.reportRainbow}>
            <input id="file-input" type="file"/>
            <br/>
            {(this.state.userRainbow === '#') ? <p>Upload an image of your rainbow!</p>: <p>success</p>}
            <button>Upload Image!</button>
          
          </form>
        </Modal>
        </div>
    );
  }
}

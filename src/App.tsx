import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./App.css";
import Auth from "./Auth/Auth";
import Map from "./RainbowViews/Map";


interface AppProps {}

interface AppState {
  sessionToken: string | null;
  lat: number;
  long: number;
  rainbowData: Array<Rainbow> | null;
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

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: "",
      lat: 35,
      long: -86,
      rainbowData: [],
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let userToken = localStorage.getItem("token");
      this.setState({ sessionToken: userToken });
      this.getLocation();
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        let latitude = location.coords.latitude
        let longitude = location.coords.longitude
        if (location) {
          this.setState({
            lat: latitude,
            long: longitude,
          });
          console.log("location -->", this.state.lat, this.state.long);
        }
      },
      (fail) => console.log("locator failed")
    );
  };


  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
    console.log("token --->", newToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  render() {
    return (
      <div>
        <h1>Rainbow Connector</h1>
        <Router>
          <Link to="/auth">Auth</Link> | | <Link to="/map">Map</Link>
          <div className="switch-routes">
            <Switch>
              <Route exact path="/auth">
                <Auth updateToken={this.updateToken} />
              </Route>
              <Route exact path="/map">
                <Map
                  token={this.state.sessionToken}
                  lat={this.state.lat}
                  long={this.state.long}
                />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

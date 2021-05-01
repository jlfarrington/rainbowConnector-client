import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from "react-router-dom";
import "./App.css";
import Auth from "./Auth/Auth";
import Feed from "./RainbowViews/Feed";
import Map from "./RainbowViews/Map";
import BottomNav from "./Navigation/BottomNav";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

interface AppProps {}

interface AppState {
  sessionToken: string | null;
  lat: number;
  long: number;
  rainbowData: Array<Rainbow> | null;
  loggedIn: boolean;
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
      loggedIn: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let userToken = localStorage.getItem("token");
      this.setState({ sessionToken: userToken, loggedIn: true });
      this.getLocation();
    }
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        let latitude = location.coords.latitude;
        let longitude = location.coords.longitude;
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
    this.setState({ sessionToken: newToken, loggedIn: true });
    console.log("token --->", newToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" , loggedIn: false});
  };

  render() {
    return (
      <Router>
        <Layout>
          <Header className="header-section">
            <h1 id="title">Rainbow Connector</h1>
          </Header>
          <Content className="content-section">
            <div className="nav-main">
             <Link to="/map">Map</Link> | |{" "}
              <Link to="/feed">Feed</Link>
            </div>

            <div className="switch-routes">
              <Switch>
                <Route exact path="/">
                  {this.state.loggedIn ? <Redirect to="/map" /> : <Redirect to="/auth" />}
                </Route>
                <Route exact path="/auth">
                  {this.state.loggedIn ? <Redirect to="/map" />: <Auth updateToken={this.updateToken} />}
                </Route>
                <Route exact path="/map">
                  <Map
                    token={this.state.sessionToken}
                    lat={this.state.lat}
                    long={this.state.long}
                  />
                </Route>
                <Route exact path="/feed">
                  <Feed token={this.state.sessionToken} />
                </Route>
              </Switch>
            </div>
          </Content>

          <Footer className="footer-section">
            <BottomNav />
          </Footer>
        </Layout>
      </Router>
    );
  }
}

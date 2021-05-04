import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Auth from "./Auth/Auth";
import Feed from "./RainbowViews/Feed";
import Map from "./RainbowViews/Map";
import UsersAdmin from './Admin/UsersAdmin'
import RainbowsAdmin from './Admin/RainbowsAdmin'
import CommentsAdmin from './Admin/CommentsAdmin'
import BottomNav from "./Navigation/BottomNav";
import { Layout } from "antd";

import TopNav from './Navigation/TopNav'
import SideMenu from './Navigation/SideMenu'

import { Rainbow } from './Interfaces'

const { Header, Footer, Content } = Layout;

interface AppProps {}

interface AppState {
  sessionToken: string | null;
  lat: number;
  long: number;
  rainbowData: Array<Rainbow> | null;
  loggedIn: boolean;
  isAdmin: boolean;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      sessionToken: "",
      lat: 35,
      long: -86,
      rainbowData: [],
      loggedIn: false,
      isAdmin: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      let userToken = localStorage.getItem("token");
      this.setState({ sessionToken: userToken, loggedIn: true });
      this.getLocation();
    }
    if (localStorage.getItem('isAdmin')) {
      let userIsAdmin = localStorage.getItem('isAdmin');
      this.setState({ isAdmin: true })
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

  updateToken = (newToken: string, newIsAdmin: boolean) => {
    localStorage.setItem("token", newToken);
    console.log("token --->", newToken);
    localStorage.setItem('isAdmin', newIsAdmin.toString())
    this.setState({ sessionToken: newToken, isAdmin: newIsAdmin });
    console.log('isAdmin ---> ', newIsAdmin)
  };

  clearToken = (): void => {
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
            <TopNav />
            <SideMenu clearToken={this.clearToken}/>
            <div className="switch-routes">
              <Switch>

                <Route exact path="/">
                  {(this.state.sessionToken != '') ? <Redirect to="/map" /> : <Redirect to="/auth" />}
                </Route>
                
                <Route exact path="/auth">
                  {(this.state.sessionToken != '') ? <Redirect to="/map" />: <Auth updateToken={this.updateToken} />}
                </Route>
                
                <Route exact path="/map">
                  {(this.state.sessionToken != '') ? <Map
                    token={this.state.sessionToken}
                    lat={this.state.lat}
                    long={this.state.long}
                  /> : <Redirect to="/" />}
                </Route>
                
                <Route exact path="/feed">
                  {(this.state.sessionToken != '') ?
                  <Feed token={this.state.sessionToken} /> :
                  <Redirect to='/' />}
                </Route>

                <Route exact path='/users'>
                  <UsersAdmin token={this.state.sessionToken} />
                </Route>

                <Route exact path='/rainbows'>
                  <RainbowsAdmin token={this.state.sessionToken} />
                </Route>

                <Route exact path='/comments'>
                  <CommentsAdmin token={this.state.sessionToken}/>
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

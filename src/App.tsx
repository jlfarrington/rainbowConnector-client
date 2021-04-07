import React, { Component } from 'react'
import './App.css'
import Auth from './Auth/Auth'
import { Button } from 'antd'

interface AppProps {

}

interface AppState {
  sessionToken: string | null;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { sessionToken: '' }
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      let userToken = localStorage.getItem('token');
      this.setState({ sessionToken: userToken })
    }
  }

 updateToken = (newToken: string) => {
    localStorage.setItem('token', newToken);
    this.setState({ sessionToken: newToken });
    console.log('token --->', newToken)
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: '' })
  }
  
  render() {
    return(
      <div>
        <h1>Rainbow Connector</h1>
        <Auth updateToken={this.updateToken} />
      </div>
    )

  }
}
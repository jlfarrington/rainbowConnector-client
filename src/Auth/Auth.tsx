import React, { Component } from "react";
import Register from './Register'
import Login from "./Login";
import RainbowIcon from '../rainbow-icon.png'
import './Auth.css'

interface AuthProps {
    updateToken: (newToken: string, newIsAdmin: boolean) => void;
}

interface AuthState {
    toggle: boolean
}


export default class Auth extends Component<AuthProps, AuthState> {
  constructor (props: AuthProps) {
      super(props);
      this.state = {
          toggle: true
      }
  }
  
    render() {
    return (
      <div className="card-login" id="cardls">
        <img src={RainbowIcon} id="auth-hero-img"/>

        {(this.state.toggle) ? (
          <Login updateToken={this.props.updateToken} />
        ) : (
          <Register updateToken={this.props.updateToken} />
        )}

        <br />
        <p className="link" onClick={() => this.setState({toggle: !this.state.toggle })}>
          {(this.state.toggle)
            ? "No Account? Click here to register."
            : "I have an account. Sign in."}
        </p>
      </div>
    );
  }
}

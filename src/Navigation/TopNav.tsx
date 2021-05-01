import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";


export default class TopNav extends Component {
    render() {
        return (
            <div className="nav-main">
            <Link to="/map">Map</Link> | |{" "}
             <Link to="/feed">Feed</Link>
           </div>
        )
    }
}
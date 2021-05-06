import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import './Navigation.css'

export default class TopNav extends Component {
    render() {
        return (
            <div className="nav-main">
                <ul>
            <li><Link to="/map" className="underline">Rainbow Map</Link> </li>
            <li>| </li>
             <li><Link to="/feed" className="underline">Rainbow Feed</Link></li>
             </ul>
           </div>
        )
    }
}
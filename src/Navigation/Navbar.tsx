import React, { Component } from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import './Navigation.css'

interface NavbarState {
  collapsed: boolean;
}

interface NavbarProps {
    clearToken: () => void;
}

const menu = (
    <Menu className="adminMenu">
    <Menu.Item key="0">
      <Link to='/users'>Users</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
    <Link to='/rainbows'>Rainbows</Link>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
    <Link to='/comments'>Comments</Link>
    </Menu.Item>
  </Menu>
);

export default class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  

  render() {
    return (
      <>
      <h1 id="title">Rainbow Connector
      {(localStorage.getItem('isAdmin') === 'true') && (localStorage.getItem('token') != '') ?
        <Dropdown.Button className="logout-menu" onClick={() => this.props.clearToken()}overlay={menu} placement="bottomCenter" icon={<SettingOutlined />}>
         Log Out
        </Dropdown.Button> : (localStorage.getItem('token') != '') && (localStorage.getItem('isAdmin') == 'false') ?
               <Button className="logout-menu" onClick={() => this.props.clearToken()}>
         Log Out
        </Button> : null }
      </h1>
       
        
      </>
    );
  }
}

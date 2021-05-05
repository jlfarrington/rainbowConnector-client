import React, { Component } from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import './Navigation.css'

interface SideMenuState {
  collapsed: boolean;
}

interface SideMenuProps {
    clearToken: () => void;
}

const menu = (
    <Menu>
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

export default class SideMenu extends Component<SideMenuProps, SideMenuState> {
  constructor(props: SideMenuProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapsed = (): void => {
    let newToggle = !this.state.collapsed;
    this.setState({
      collapsed: newToggle,
    });
  };

  render() {
    return (
        <Space wrap className="logout-menu">
            
            {(localStorage.getItem('isAdmin') === 'true') ?
        <Dropdown.Button onClick={() => this.props.clearToken()}overlay={menu} placement="bottomCenter" icon={<SettingOutlined />}>
         Log Out
        </Dropdown.Button> :
       
        <Button onClick={() => this.props.clearToken()}>
         Log Out
        </Button>}
      </Space>
    );
  }
}

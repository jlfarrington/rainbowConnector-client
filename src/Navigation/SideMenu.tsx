import React, { Component } from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { SettingOutlined } from "@ant-design/icons";

interface SideMenuState {
  collapsed: boolean;
}

interface SideMenuProps {
    clearToken: () => void;
}

const menu = (
    <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">Users</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">Rainbows</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">Comments</Menu.Item>
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
        <Space wrap>
            
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

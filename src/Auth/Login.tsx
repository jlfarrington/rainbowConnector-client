import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import APIURL from '../helpers/environment'
import '../App.css'

interface LoginProps {
  updateToken: (newToken: string, newIsAdmin: boolean) => void;
}

interface LoginState {
  email: string;
  password: string;
}

export default class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.props.updateToken(data.token, data.user.isAdmin);
      });
  }

  render() {
    return (
      <div className="login">
        <h1>Log in</h1>
        <Form
          name="normal_long"
          className="login-form"
          onFinish={(e: React.ChangeEvent<HTMLFormElement>): void =>
            this.handleSubmit(e)
          }
        >
          <Form.Item
            className="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              placeholder="Email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.setState({ email: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            className="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              placeholder="Password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.setState({ password: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="auth-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Form, Input, Button } from "antd";

interface RegisterProps {
    updateToken: (newToken: string, newIsAdmin: boolean) => void
}

interface RegisterState {
    email: string,
    password: string
    firstName: string,
    lastName: string
}

export default class Register extends Component <RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
       fetch('http://localhost:3000/user/register', {
           method: 'POST',
           body: JSON.stringify({user: {
               firstName: this.state.firstName,
               lastName: this.state.lastName,
               email: this.state.email,
               password: this.state.password,
               isAdmin: false
            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
       }) .then(response => response.json())
       .then(data => {
           console.log(data)
           this.props.updateToken(data.token, data.user.isAdmin)
        }) 
    }

    render() {
        return(
            <div className="Register">
                <h1>Register</h1>

        <Form name="normal_long"
          className="register-form"
          onFinish={(e: React.ChangeEvent<HTMLFormElement>): void =>
            this.handleSubmit(e)
          }>
            <Form.Item
            className="first-name"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input
              placeholder="First Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.setState({ firstName: e.target.value})
              }
            />
            </Form.Item>

              <Form.Item
            className="last-name"
            rules={[{ required: true, message: "Please input your last name!" }]}
          >
            <Input
              placeholder="Last Name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                this.setState({ lastName: e.target.value})
              }
            />
            </Form.Item>


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
              Register
            </Button>
          </Form.Item>
        </Form>
        </div>
        )
    }
}
import React, { Component } from 'react';

interface LoginProps {
    updateToken: (newToken: string) => void
}

interface LoginState {
    email: string,
    password: string
}

export default class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit(event: React.ChangeEvent<HTMLFormElement>): void {
       event.preventDefault();
       fetch('http://localhost:3000/user/login', {
           method: 'POST',
           body: JSON.stringify({user: {
               email: this.state.email,
               password: this.state.password 
            }}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
       }) .then(response => response.json())
       .then(data => {
        console.log(data)   
        this.props.updateToken(data.token)})
    
    }

    render() {
        return(
            <div className="login">
                <h1>Log in</h1>
                <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>): void => this.handleSubmit(e)}>
                <label htmlFor="email">Email</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ email: e.target.value })}
                    name="email"
                    placeholder="email@email.com"
                    value={this.state.email}/>
                    
                    <label htmlFor="password">Password</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ password: e.target.value })}
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    type="password"/>
                    <button>Log in</button>
                </form>
            </div>
        )
    }
}
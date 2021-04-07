import React, { Component } from 'react';

interface RegisterProps {
    updateToken: (newToken: string) => void
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
       event.preventDefault();
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
           this.props.updateToken(data.token)
        }) 
    }

    render() {
        return(
            <div className="Register">
                <h1>Register</h1>
                <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>): void => this.handleSubmit(e)}>
                   
                    <label htmlFor="firstName">First Name:</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ firstName: e.target.value})}
                    name="firstName"
                    placeholder="Jane"
                    value={this.state.firstName}/>
                    
                    <label htmlFor="lastName">Last Name:</label>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>): void => this.setState({ lastName: e.target.value})}
                    name="lastName"
                    placeholder="Doe"
                    value={this.state.lastName}/>
                    
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
                    
                    <button>Register</button>
                </form>
            </div>
        )
    }
}
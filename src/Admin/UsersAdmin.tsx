import React, { Component } from 'react'
import { Button } from 'antd'
import { User } from '../Interfaces'
import './Admin.css'
import APIURL from '../helpers/environment'

interface UsersAdminProps {
    token: string | null
}

interface UsersAdminState {
    userData: null | Array<User>
}



export default class UsersAdmin extends Component<UsersAdminProps, UsersAdminState> {
    constructor(props: UsersAdminProps) {
        super(props);
        this.state = {
            userData: null
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token')
        this.getUsers(token)
    }

    getUsers = (token: string | null): void => {
        if (token) {
          fetch(`${APIURL}/user/userinfo`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: token,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              this.setState({
                userData: data,
              });
            });
        }
      };

      deleteUser = (user: User): void => {
          if (this.props.token) {
              fetch(`${APIURL}/user/delete/${user.id}`, {
                  method: "DELETE",
                  headers: new Headers({
                      "Content-Type": "application/json",
                      Authorization: this.props.token,
                  }),
              })
              .then(res => console.log(res.json()))
          }
          this.getUsers(this.props.token);
      }

      promoteAdmin = (user: User): void => {
          if (this.props.token) {
              fetch(`${APIURL}/user/update/${user.id}`, {
                  method: "PUT",
                  headers: new Headers({
                      "Content-Type": "application/json",
                      Authorization: this.props.token,
                  }),
                  body: JSON.stringify({user: {
                    isAdmin: true
                 }}),
              })
              .then(res => console.log(res.json()))
          }
          this.getUsers(this.props.token)
      }

     userMapper = () => {
          if (this.state.userData) {
              return this.state.userData.map((user, index) => {
                  return(
                  <tr key={index}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td> <Button onClick={() => this.deleteUser(user)}>Delete User</Button>{(!user.isAdmin) ? <Button onClick={() => this.promoteAdmin(user)}>Promote to Admin</Button>: null}</td>
                  </tr>
                  )
              })
          }
      }
    

    
    render() {
        return(
            <>
            <h1 className="admin-title">Users</h1>
            <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.state.userData) ? this.userMapper() : null}
                </tbody>
            </table>
            </div>
            </>
        )
    }
} 
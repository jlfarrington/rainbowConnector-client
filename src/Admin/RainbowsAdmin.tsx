import React, { Component } from 'react'
import { Button } from 'antd'
import { Rainbow } from '../Interfaces'
import './Admin.css'

interface RainbowsAdminProps {
    token: string | null
}

interface RainbowsAdminState {
    rainbowData: null | Array<Rainbow>
}


export default class RainbowsAdmin extends Component<RainbowsAdminProps, RainbowsAdminState> {
    constructor(props: RainbowsAdminProps) {
        super(props);
        this.state = {
            rainbowData: null
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token')
        this.getRainbows(token)
    }

    getRainbows = (token: string | null): void => {
        if (token) {
          fetch("http://localhost:3000/rainbow/", {
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
                rainbowData: data,
              });
            });
        }
      };

      deleteRainbow = (rainbow: Rainbow): void => {
          if (this.props.token) {
              fetch(`http://localhost:3000/rainbow/${rainbow.id}`, {
                  method: "DELETE",
                  headers: new Headers({
                      "Content-Type": "application/json",
                      Authorization: this.props.token,
                  }),
              })
              .then(res => console.log(res.json()))
          }
          this.getRainbows(this.props.token);
      }



    rainbowMapper = () => {
          if (this.state.rainbowData) {
              return this.state.rainbowData.map((rainbow, index) => {
                  return(
                  <tr key={index}>
                      <td><img src={rainbow.image} width='200px' /></td>
                      <td>{rainbow.likes}</td>
                      <td>{rainbow.lat}</td>
                      <td>{rainbow.long}</td>
                      <td> <Button onClick={() => this.deleteRainbow(rainbow)}>Delete Rainbow</Button></td>
                  </tr>
                  )
              })
          }
      }
    

    
    render() {
        return(
            <>
            <h1>Rainbows</h1>
            <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Rainbow Image</th>
                        <th>Number of Likes</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.state.rainbowData) ? this.rainbowMapper() : null}
                </tbody>
            </table>
            </div>
            </>
        )
    }
} 
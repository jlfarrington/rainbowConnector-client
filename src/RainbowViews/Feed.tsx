import React, { Component } from 'react';
import { Rainbow } from '../Interfaces'
import Post from './Post'
import './Feed.css'

interface FeedProps {
    token: string | null
}

interface FeedState {
    rainbowData: Array<Rainbow> | null
}

export default class Feed extends Component<FeedProps, FeedState> {
    constructor(props: FeedProps) {
      super(props);
      this.state = {
        rainbowData: null,
      };
    }

    componentDidMount() {
        let token = localStorage.getItem('token')
        this.getRainbows(token);
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


    render() {
        return(
            <div className="rainbow-feed-wrapper">
                {this.state.rainbowData?.map(
                   (rainbow, index) => {
                        return(
                            <Post rainbow={rainbow} key={index} token={this.props.token}/>
                        )
                    }
            )}
            </div>
        )
    }
}
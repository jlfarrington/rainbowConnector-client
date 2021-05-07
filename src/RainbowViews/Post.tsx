import React, { Component } from 'react'
import { Card, Comment } from 'antd'
import { HeartTwoTone } from '@ant-design/icons'
import { Rainbow } from '../Interfaces'
import Comments from './Comments'
import APIURL from '../helpers/environment'
import './Feed.css'

interface PostProps {
    rainbow: Rainbow
    key: number
    token: string | null
}

interface PostState {
    rainbowData: Array<Rainbow> | null,
    likesCount: number
}

export default class Post extends Component<PostProps, PostState> {
    constructor(props: PostProps) {
        super(props);
        this.state = {
          rainbowData: null,
          likesCount: this.props.rainbow.likes
        };
      }

      likeRainbow = (rainbow: Rainbow): void => {
        let newLikes = rainbow.likes + 1
        if (this.props.token) {
          fetch(`${APIURL}/rainbow/${rainbow.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json",'Authorization': this.props.token}, body: JSON.stringify({
                rainbow: {
                image: rainbow.image,
                likes: newLikes,
                lat: rainbow.lat,
                long: rainbow.long,
              }})
             }) .then(response => console.log(response.json()))
        }
        this.setState({
            likesCount: newLikes
        })
      }

    render() {
        return(
            <div className="card-wrapper">
                <Card className="rainbow-card">
                 <img src={this.props.rainbow.image} className="rainbow-image"/>
                   <div>
                    <HeartTwoTone twoToneColor="#ff3c38" onClick={() => this.likeRainbow(this.props.rainbow)}/> {this.state.likesCount}
                    </div>
                    <Comments rainbow={this.props.rainbow} token={this.props.token}/>
                 </Card>
            </div>
        )
    }
}
import React, { Component } from 'react';

import { Comment } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import { Rainbow, RainbowComment } from '../Interfaces'

import AddComment from './AddComment'
import APIURL from '../helpers/environment'

interface CommentsProps {
    rainbow: Rainbow
    token: string | null
}

interface CommentsState {
    likesCount: number,
    commentsData: Array<RainbowComment> | null
}



export default class Comments extends Component<CommentsProps, CommentsState> {
    constructor(props: CommentsProps) {
        super(props);
        this.state = {
          likesCount: 0,
          commentsData: null
        };
      }

      getComments = (): void => {
        if (this.props.token) {
         
          fetch(`${APIURL}/comment/${this.props.rainbow.id}`, {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: this.props.token,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              this.setState({
                commentsData: data,
              });
            });
        }
      };

      componentDidMount() {
          this.getComments()
      }

      likeComment = (comment: RainbowComment) :void => {
        let newLikes = comment.likes + 1
        if(this.props.token){
          fetch(`${APIURL}/comment/${comment.id}`, {
              method: "PUT",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token,
              }),
              body: JSON.stringify({
                  comment: {
                      body: comment.body,
                      likes: newLikes
                    }
              })
            })
              .then((response) => response.json())
              .then((res) => {
                console.log(res);
              });
      }
      this.getComments();
    }

      render() {
          return(
              <>
              {this.state.commentsData?.map((comment, index) => {
                  return(
                    <div className="comment-section" key={index}>
                        
                        <Comment
                            author={<b>Comment Author</b>}
                            content={<p>{comment.body}</p>} />
                        <LikeOutlined onClick={() => this.likeComment(comment)}/> {comment.likes}
                            
                            
                    </div>
                  )
              })}
              <AddComment rainbow={this.props.rainbow} token={this.props.token} getComments={this.getComments} />
              </>
          )
      }
}
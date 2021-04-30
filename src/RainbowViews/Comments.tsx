import React, { Component } from 'react';

import { Comment } from 'antd'
import { LikeOutlined } from '@ant-design/icons'


interface CommentsProps {
    rainbow: Rainbow
    key: number
    token: string | null
}

interface CommentsState {
    likesCount: number,
    commentsData: Array<Comment> | null
}

interface Comment {
    body: string,
    likes: number
}

interface Rainbow {
    id: number;
    image: string;
    likes: number;
    lat: number;
    long: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
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
         
          fetch(`http://localhost:3000/comment/${this.props.rainbow.id}`, {
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

      render() {
          return(
              <>
              {this.state.commentsData?.map((comment, index) => {
                  return(
                    <div className="comment-section" key={index}>
                        <LikeOutlined /> {comment.likes}
                        <Comment
                            author={<b>Comment Author</b>}
                            content={<p>{comment.body}</p>} />
                    </div>
                  )
              })}
              </>
          )
      }
}
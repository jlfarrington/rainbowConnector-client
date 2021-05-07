import React, { Component } from 'react'
import { Button } from 'antd'
import { RainbowComment } from '../Interfaces'
import './Admin.css'
import APIURL from "../helpers/environment"

interface CommentsAdminProps {
    token: string | null
}

interface CommentsAdminState {
    commentsData: null | Array<RainbowComment>
}


export default class CommentsAdmin extends Component<CommentsAdminProps, CommentsAdminState> {
    constructor(props: CommentsAdminProps) {
        super(props);
        this.state = {
            commentsData: null
        }
    }



    componentDidMount() {
        const token = localStorage.getItem('token')
        this.getComments(token)
    }

    getComments = (token: string | null): void => {
        if (token) {
          fetch(`${APIURL}/comment/all`, {
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
                commentsData: data,
              });
            });
        }
      };

      deleteComment = (rainbowComment: RainbowComment): void => {
          if (this.props.token) {
              fetch(`${APIURL}/comment/${rainbowComment.id}`, {
                  method: "DELETE",
                  headers: new Headers({
                      "Content-Type": "application/json",
                      Authorization: this.props.token,
                  }),
              })
              .then(res => console.log(res.json()))
          }
          this.getComments(this.props.token);
      }



    commentMapper = () => {
          if (this.state.commentsData) {
              return this.state.commentsData.map((rainbowComment, index) => {
                  return(
                  <tr key={index}>
                      <td>{rainbowComment.body}</td>
                      <td>{rainbowComment.likes}</td>
                      <td>{rainbowComment.rainbowId}</td>
                      <td> <Button onClick={() => this.deleteComment(rainbowComment)}>Delete Comment</Button></td>
                  </tr>
                  )
              })
          }
      }
    

    
    render() {
        return(
            <>
            <h1 className="admin-title">Comments</h1>
            <div className="admin-table-wrapper">
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Comment Body</th>
                        <th>Number of Likes</th>
                        <th>Rainbow ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(this.state.commentsData) ? this.commentMapper() : null}
                </tbody>
            </table>
            </div>
            </>
        )
    }
} 
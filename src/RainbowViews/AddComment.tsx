import React, { Component } from 'react';

import { Comment, Form, Button, Input } from 'antd';

import { Rainbow } from '../Interfaces'
import APIURL from '../helpers/environment'

const { TextArea } = Input;




interface AddCommentProps {
    rainbow: Rainbow;
    token: string | null;
    getComments: () => void;
}


interface AddCommentState {
    value: string;
    submitting: boolean;
}


const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
    <>
      <Form.Item>
        <TextArea rows={2} onChange={onChange} value={value} placeholder='Add a comment' />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} className="add-comment-btn">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );

export default class AddComment extends Component<AddCommentProps, AddCommentState> {
    constructor(props: AddCommentProps) {
        super(props);
        this.state = {
          value: '',
          submitting: false
        };
      }


    handleSubmit = (): void => {
        if (!this.state.value) {
            return;
        }
        this.setState({
            submitting: true
        })

        setTimeout(() => {
            

          if(this.props.token){
            fetch(`${APIURL}/comment/post/${this.props.rainbow.id}`, {
                method: "POST",
                headers: new Headers({
                  "Content-Type": "application/json",
                  Authorization: this.props.token,
                }),
                body: JSON.stringify({
                    comment: {
                        body: this.state.value,
                        likes: 0
                      }
                })
              })
                .then((response) => response.json())
                .then((res) => {
                  console.log(res);
                });

                this.setState({
                    submitting: false,
                    value: ''
                })

                this.props.getComments();
          }
        }, 1000);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            value: e.target.value
        })
    }


    render(){

        const { submitting, value } = this.state;
        
        return(
            <Comment
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />}
              />
        )
    }
}
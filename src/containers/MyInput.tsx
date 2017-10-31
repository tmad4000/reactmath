import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState } from 'draft-js';

export interface MyInputState {
    value: any
}


export interface MyInputProps extends React.Props<MyInput> {
}


export default class MyInput extends React.Component<MyInputProps, MyInputState> {
    onChange: any

    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.onChange = (evt) => {
            evt.persist()
            console.log(evt)

            this.setState({ value: evt.target.value });
        }
    }
    render() {
        return (
            <div style={{ border: "1px solid red" }}>
                <input value={this.state.value} onChange={this.onChange} />
            </div>
        );
    }
}
import * as React from "react";
import MyEditor from "./MyEditor"
import MyInput from "./MyInput"
import SimpleEditor from "./SimpleEditor"
// import EntityEditor from "./EntityEditor"


export interface AppState {
    // txt: string
}


export interface AppProps extends React.Props<App> {
}


export default class App extends React.Component<AppProps, AppState> {

    constructor(props) {
        super(props)
        // this.state = { txt: "pollen" }
    }


    render() {


        return (<div>
            {/* <input type="text" value={this.state.txt}
                onChange={(evt) => this.setState({ txt: evt.currentTarget.value })} />
            <button onClick={() => this.setState((prevState) => {
                return { txt: prevState.txt + "yo" }
            })
            }> yo </button>
            <MyEditor /> */}
            Hello World
            <Rect w={6} h={2} />

        </div>)


    }
}

const Welcome = (props) => {
 return <h1>Hello, {props.name}</h1>;
}


const Rect = (props) => {
    return <canvas id="myCanvas" width="60" height="100" style={{"border":"1px solid #c3c3c3;"}}>
            Your browser does not support the canvas element.
        </canvas>;
   }

interface CommentListState {
    comments: string[]
}


interface CommentListProps {
}

class CommentList extends React.Component<CommentListProps, CommentListState> {


    constructor(props) {
        super(props)
        this.state = { comments: ["comment1", "#twitter"] }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.setState({ comments: [] })}>Change</button>
                <div style={{ border: "1px solid purple" }}>
                    {this.state.comments.map(
                        (v: string) => <div> {v}</div>
                    )}
                </div>
            </div>)

    }
}

import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, SelectionState } from 'draft-js';

export interface MyEditorState {
    editorState: any
}


export interface MyEditorProps extends React.Props<MyEditor> {
}


export default class MyEditor extends React.Component<MyEditorProps, MyEditorState> {
    onChange: any

    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
        this.onChange = (editorState: EditorState) => {

            // console.log(editorState.getCurrentContent().getPlainText())
            // console.log(editorState.getSelection().getAnchorOffset())
            if (editorState.getLastChangeType() === "backspace-character") {
                let fo = this.state.editorState.getSelection().getFocusOffset() 

                let selectionState = this.state.editorState.getSelection();


                let edText = this.state.editorState.getCurrentContent().getPlainText()
                let shouldSelect = false

                let i: number = 0

                mainSearch:
                for (i = fo; i >= 0; i--) {
                    let c = edText.charAt(i)
                    console.log(c)
                    if (c.match("#|@")) {
                        shouldSelect = true
                        break
                    }
                    else if (c === ">") {
                        for (i = i - 1; i >= 0; i--) {
                            if (edText.charAt(i) === "<") {
                                shouldSelect = true
                                break mainSearch
                            }
                        }
                    }
                    // debugger
                    // c.match(/ /)
                    else if (c.match(/\s/)) {
                        break                        
                    }
                }

                if (shouldSelect) {
                    console.log(i)

                    let newSel: SelectionState = selectionState.set('anchorOffset', fo).set('focusOffset', Math.max(0, i)).set('isBackward', true) as SelectionState;

                    this.setState((prevState) => {
                        return {
                            editorState: EditorState.forceSelection(prevState.editorState, newSel)
                        }
                    });
                    return
                }

            }

            this.setState({ editorState });
        }

    }
    render() {
        return (
            <div style={{ border: "1px solid gray" }}>
                <Editor editorState={this.state.editorState} onChange={this.onChange} />
            </div>
        );
    }
}
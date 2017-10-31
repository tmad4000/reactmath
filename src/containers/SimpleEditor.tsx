import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, SelectionState, Modifier } from 'draft-js';

export interface SimpleEditorState {
    editorState: EditorState
}


export interface SimpleEditorProps extends React.Props<SimpleEditor> {
}


export default class SimpleEditor extends React.Component<SimpleEditorProps, SimpleEditorState> {
    onChange: any
    focus: any
    logState: any


    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };

        this.onChange = (editorState: EditorState) => {
            let nextEditorState: EditorState = editorState

            if (editorState.getLastChangeType() === "insert-characters") {
                const SECRET_STRING = "noodles"
                let fo: number = editorState.getSelection().getFocusOffset()

                if (
                    editorState.getCurrentContent().getPlainText()
                        .substring(fo - SECRET_STRING.length, fo) === SECRET_STRING
                ) {



                    // console.log(editorState.getCurrentContent().getPlainText())

                    let newContentState = Modifier.insertText(
                        editorState.getCurrentContent(),
                        editorState.getSelection(),
                        "panda",
                    )
                    nextEditorState = EditorState.push(
                        editorState,
                        newContentState,
                        "insert-characters"
                    )


                    const contentState = nextEditorState.getCurrentContent();
                    const contentStateWithEntity = contentState.createEntity(
                        'LINK',
                        'MUTABLE',
                        { url: 'http://www.zombo.com' }
                    );
                    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                    const contentStateWithLink = Modifier.applyEntity(
                        contentStateWithEntity,
                        nextEditorState.getSelection(),
                        entityKey
                    );

                    nextEditorState = EditorState.push(
                        nextEditorState,
                        contentStateWithLink,
                        "apply-entity"
                    )
                }
            }


            this.setState({ editorState: nextEditorState });
        }
        this.logState = () => console.log(this.state.editorState.toJS());


    }
    render() {
        return (
            <div>
                <div style={{ border: "1px solid pink" }}>
                    <Editor
                        ref={(ed) => ed && ed.focus()}
                        editorState={this.state.editorState} onChange={this.onChange} />


                </div>

                <input
                    onClick={this.logState}
                    type="button"
                    value="Log State"
                />
            </div>
        );
    }
}
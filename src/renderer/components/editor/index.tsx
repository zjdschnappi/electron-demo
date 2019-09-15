import React, { useState, useRef } from "react";
import { Editor, EditorState, Modifier, CompositeDecorator } from "draft-js";
import Toolbar from "./toolbar";
import decorators from "./decorators";
import { render } from "react-dom";
const decorator = new CompositeDecorator(decorators);
export default class MyEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(decorator)
  };

  editorRef: any = null;
  handleChange = (editorState: any, callback = () => {}) => {
    this.setState({ editorState }, () => {
      callback();
    });
  };
  handleInsertEmoji = (emoji: any) => {
    const { emojiString } = emoji;
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "EMOJI",
      "IMMUTABLE",
      emoji
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const emojiAddedContent = Modifier.replaceText(
      contentState,
      selection,
      " ",
      undefined,
      entityKey
    );
    const newEditorState = EditorState.push(
      editorState,
      emojiAddedContent,
      "insert-characters"
    );

    this.handleChange(newEditorState, () => {
      this.focus();
    });
  };
  focus = () => {
    this.editorRef.focus();
  };
  render() {
    const { editorState } = this.state;
    return (
      <div className="editor-container">
        <div className="editor-header">
          <Toolbar insertEmoji={this.handleInsertEmoji} />
        </div>
        <div className="editor-content">
          <Editor
            editorState={editorState}
            onChange={this.handleChange}
            ref={ref => (this.editorRef = ref)}
          />
        </div>
        <div className="editor-footer"></div>
      </div>
    );
  }
}

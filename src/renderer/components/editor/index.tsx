import React from "react";
import {
  Editor,
  EditorState,
  Modifier,
  CompositeDecorator,
  AtomicBlockUtils
} from "draft-js";
import fs from "fs";
import Toolbar from "./toolbar";
import decorators from "./decorators";
import { getBlockRendererFn } from "./blockRender";
const decorator = new CompositeDecorator(decorators);
const MAX_FILE_SIZE = 2;
export default class MyEditor extends React.Component {
  state = {
    editorState: EditorState.createEmpty(decorator)
  };

  editorRef: any = null;
  handleChange = (editorState: any, callback = () => {}) => {
    this.setState({ editorState }, callback);
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
  insertMedia = (type: string, files: FileList) => {
    const { editorState } = this.state;
    const hasOverSizeFile = Array.from(files).some(
      item => item.size > MAX_FILE_SIZE * 1024 * 1024
    );
    const hasDirectory = Array.from(files).some(item =>
      fs.statSync(item.path).isDirectory()
    );
    if (hasOverSizeFile) {
      alert(`文件不能大于${MAX_FILE_SIZE}兆`);
      return;
    }
    if (hasDirectory) {
      alert("不支持上传文件夹");
      return;
    }
    const newEditorState = Array.from(files).reduce((prevEditorState, file) => {
      const contentStateWithEntity = prevEditorState
        .getCurrentContent()
        .createEntity(type, "IMMUTABLE", { file });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

      return AtomicBlockUtils.insertAtomicBlock(
        prevEditorState,
        entityKey,
        " "
      );
    }, editorState);

    this.handleChange(newEditorState, () => {
      this.focus();
    });
  };
  handleInsertImage = (files: FileList) => {
    this.insertMedia("IMAGE", files);
  };
  handleInsertFile = (files: FileList) => {
    this.insertMedia("FILE", files);
  };
  focus = () => {
    this.editorRef.focus();
  };
  render() {
    const { editorState } = this.state;
    return (
      <div className="editor-container">
        <div className="editor-header">
          <Toolbar
            insertEmoji={this.handleInsertEmoji}
            insertImage={this.handleInsertImage}
            insertFile={this.handleInsertFile}
          />
        </div>
        <div className="editor-content">
          <Editor
            editorState={editorState}
            onChange={this.handleChange}
            ref={ref => (this.editorRef = ref)}
            blockRendererFn={getBlockRendererFn}
          />
        </div>
        <div className="editor-footer"></div>
      </div>
    );
  }
}

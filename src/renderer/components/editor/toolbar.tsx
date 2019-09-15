import React from "react";
import EmojiPicker from "./emojiPicker";
import ImagePicker from "./imagePicker";
import FilePicker from "./filePicker";
interface Iprops {
  insertEmoji: (emoji: any) => void;
  insertImage: (files: FileList) => void;
  insertFile: (files: FileList) => void;
}
export default function Toolbar(props: Iprops) {
  const { insertEmoji, insertImage, insertFile } = props;
  return (
    <ul className="editor-toolbar">
      <li className="toolbar-item">
        <EmojiPicker insertEmoji={insertEmoji}>
          <i className="toolbar-icon" />
        </EmojiPicker>
      </li>
      <li className="toolbar-item">
        <ImagePicker insertImage={insertImage}>
          <i className="toolbar-icon icon-image" />
        </ImagePicker>
      </li>
      <li className="toolbar-item">
        <FilePicker insertFile={insertFile}>
          <i className="toolbar-icon icon-file" />
        </FilePicker>
      </li>
    </ul>
  );
}

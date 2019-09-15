import React from "react";
import EmojiPicker from "./emojiPicker";
interface Iprops {
  insertEmoji: (emoji: any) => void;
}
export default function Toolbar(props: Iprops) {
  const { insertEmoji } = props;
  return (
    <ul className="editor-toolbar">
      <li className="toolbar-item">
        <EmojiPicker insertEmoji={insertEmoji}>
          <i className="toolbar-icon" />
        </EmojiPicker>
      </li>
      <li className="toolbar-item">
        <i className="toolbar-icon icon-image" />
      </li>
      <li className="toolbar-item">
        <i className="toolbar-icon icon-file" />
      </li>
    </ul>
  );
}

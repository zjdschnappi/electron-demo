import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";
export function MyEditor() {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const handleChange = () => {};
  return <Editor editorState={editorState} onChange={handleChange} />;
}

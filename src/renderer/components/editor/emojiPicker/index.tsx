import React, { useState } from "react";
import { Popover } from "antd";
import EmojiTemplate from "./emojiTemplate";

interface IEmojipickerProps {
  children: React.ReactNode;
  insertEmoji: (emoji: any) => void;
}
export default function EmojiPicker(props: IEmojipickerProps) {
  const { insertEmoji } = props;
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleVisibleChange = (visible: boolean) => {
    setPickerVisible(visible);
  };
  const handleSelectEmoji = (item: any) => {
    const { name } = item;

    insertEmoji({ ...item, emojiString: `[${name}]` });

    setPickerVisible(false);
  };
  const { children } = props;
  return (
    <Popover
      content={
        <div className="emoji-picker-container">
          <div className="emoji-picker-content">
            <EmojiTemplate onSelectEmoji={handleSelectEmoji} />
          </div>
        </div>
      }
      overlayClassName="emoji-picker-popover element-no-drag"
      trigger="click"
      visible={pickerVisible}
      onVisibleChange={handleVisibleChange}
    >
      {children}
    </Popover>
  );
}

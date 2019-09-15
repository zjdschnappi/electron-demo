import React from "react";
import { emojiList } from "./config";

export type EmojiType = "small" | "big";
interface IEmojiTemplateProps {
  onSelectEmoji: (item: object) => void;
}
export default function EmojiTemplate(props: IEmojiTemplateProps) {
  const { onSelectEmoji } = props;
  return (
    <ul className={`emoji-container`}>
      {emojiList.map((item, index) => {
        const url = `./assets/emoji/${item.value}`;
        return (
          <li
            key={index}
            className={"single-emoji-wrap"}
            onClick={() => {
              onSelectEmoji({ ...item, url, index });
            }}
          >
            <img
              className="emoji-img"
              src={url}
              alt={item.name}
              title={item.name}
            />
          </li>
        );
      })}
    </ul>
  );
}

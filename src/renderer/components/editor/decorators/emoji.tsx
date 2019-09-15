import React from "react";

function handleStrategy(contentBlock: any, callback: any, contentState: any) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "EMOJI"
    );
  }, callback);
}

const Emoji = (props: any) => {
  const { children, entityKey, contentState, offsetKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  const backgroundUrl = url;
  return (
    <span data-offset-key={offsetKey} className="span-emoji">
      <img src={backgroundUrl} />
      {children}
    </span>
  );
};

export default {
  strategy: handleStrategy,
  component: Emoji
};

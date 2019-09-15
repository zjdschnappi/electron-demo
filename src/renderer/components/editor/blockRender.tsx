import React from "react";
import { ContentBlock } from "draft-js";
import File from "./atomic/file";
import Image from "./atomic/image";

const getAtomicBlockComponent = (props: any) => {
  const { block, contentState } = props;
  const entityKey = block.getEntityAt(0);

  if (!entityKey) {
    return null;
  }

  const entity = contentState.getEntity(entityKey);
  const mediaData = entity.getData();
  const mediaType = entity.getType();
  const mediaProps = {
    block,
    mediaData,
    entityKey
  };
  const { file = {} } = mediaData;
  const { type = "" } = file;
  const isImage = type.indexOf("image") > -1;
  if (mediaType === "FILE" && !isImage) {
    return <File {...mediaProps} />;
  }
  if (mediaType === "IMAGE" || isImage) {
    return <Image {...mediaProps} />;
  }

  return null;
};

export const getBlockRendererFn = (contentBlock: ContentBlock) => {
  return contentBlock.getType() === "atomic"
    ? {
        component: getAtomicBlockComponent,
        editable: false
      }
    : null;
};

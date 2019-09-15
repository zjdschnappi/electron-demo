import React, { useState, useEffect } from "react";
import { remote } from "electron";

function getFileIcon(filePath: string, callback: (img: string) => void) {
  remote.app
    .getFileIcon(filePath)
    .then(value => {
      callback(value.toDataURL());
    })
    .catch(() => {});
}
export default function File(props: any) {
  const [fileIcon, setfileIcon] = useState("");
  const { mediaData } = props;

  const { file } = mediaData;
  const { name, type, size = 0, path } = file;
  const formatSize = Math.ceil(size / 1024);
  let sizeInfo = `${formatSize}k`;
  if (formatSize > 1024) {
    sizeInfo = `${(formatSize / 1024).toFixed(1)}m`;
  }
  useEffect(() => {
    getFileIcon(path, value => {
      setfileIcon(value);
    });
  }, []);

  return (
    <span className="file-atomic-wrap">
      <img className="file-img" src={fileIcon} alt="file" />
      <span className="file-info">
        <span>{name}</span>
        <span className="size-info">{sizeInfo}</span>
      </span>
    </span>
  );
}

import React from "react";

export default function Image(props: any) {
  const { mediaData } = props;
  const { file } = mediaData;
  const { name } = file;
  const url = window.URL.createObjectURL(file);

  return <img style={{ width: "100px" }} src={url} alt={name} />;
}

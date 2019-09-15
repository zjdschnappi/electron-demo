import React, { useRef, ChangeEvent } from "react";

export default function ImagePicker(props: any) {
  const { children, insertImage } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files = [] }: any = target;
    if (
      Array.from(files).every((file: any) => file.type.indexOf("image") > -1)
    ) {
      insertImage(files);
    } else {
      alert("仅支持图片类型");
    }
    e.target.value = "";
  };
  return (
    <span onClick={handleClickUpload}>
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/gif, image/jpeg, image/png"
      />
      {children}
    </span>
  );
}

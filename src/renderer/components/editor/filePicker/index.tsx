import React, { useRef, ChangeEvent } from 'react';

export default function FilePicker(props: any) {
  const { children, insertFile } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { files = [] }: any = target;
    insertFile(files);
    e.target.value = '';
  };
  return (
    <span onClick={handleClickUpload}>
      <input type="file" multiple ref={inputRef} onChange={handleFileChange} style={{ display: 'none' }} />
      {children}
    </span>
  );
}

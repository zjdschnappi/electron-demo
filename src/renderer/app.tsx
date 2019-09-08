import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ipcRenderer, shell } from "electron";
import { DataStore } from "./dataStore";

// 文件地址缓存
const FileStore = new DataStore({ name: "file_map" });

function Demo() {
  const [progress, setprogress] = useState(0);
  const [savePath, setsavePath] = useState("");
  const handleDownloadProgress = () => {
    ipcRenderer.on("download-progress", (e, { progress }) => {
      setprogress(progress);
    });
  };
  const handleDownloadComplete = () => {
    ipcRenderer.on("download-complete", (e, { savePath }) => {
      FileStore.addData({
        "1": savePath
      });
      setsavePath(savePath);
    });
  };
  const handleDownload = () => {
    ipcRenderer.send("download-file", {
      url:
        "https://download.sublimetext.com/Sublime Text Build 3207 x64 Setup.exe",
      saveAs: true,
      fileName: "123.exe",
      uuid: "1"
    });
  };
  useEffect(() => {
    handleDownloadProgress();
    handleDownloadComplete();
  }, []);
  return (
    <>
      <button onClick={handleDownload}>下载文件</button>
      <p>下载进度{progress}</p>
      <p>下载地址{savePath}</p>
      {savePath ? (
        <>
          <button
            onClick={() => {
              shell.openItem(savePath);
            }}
          >
            打开
          </button>
          <button
            onClick={() => {
              shell.showItemInFolder(savePath);
            }}
          >
            打开文件夹
          </button>
        </>
      ) : null}
    </>
  );
}

ReactDOM.render(<Demo />, document.getElementById("root"));

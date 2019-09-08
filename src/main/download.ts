import { BrowserWindow, ipcMain, dialog, app } from "electron";
import electronDl from "electron-dl";

interface DownloadParams extends electronDl.Options {
  url: string;
  fileName?: string;
  saveAs?: boolean;
  uuid: string;
}
export default class Download {
  constructor() {
    electronDl();
  }
  downloadItemMap: { [key: string]: Electron.DownloadItem } = {};
  init = (mainWindow: BrowserWindow) => {
    ipcMain.on("download-file", async (e: any, params: DownloadParams) => {
      const { saveAs, fileName } = params;
      if (saveAs) {
        const result = await dialog.showSaveDialog({
          defaultPath: `${app.getPath("downloads")}/${fileName}`
        });
        const { filePath, canceled } = result;
        if (filePath) {
          this.handleDownLoad(mainWindow, { ...params, directory: filePath });
        }
      } else {
        this.handleDownLoad(mainWindow, { ...params });
      }
    });
    ipcMain.on("download-cancel", (e: any, params: any) => {
      const { uuid } = params;
      const currentDownloadItem = this.downloadItemMap[uuid];
      if (currentDownloadItem) {
        currentDownloadItem.cancel();
      }
    });
  };
  handleDownLoad = (mainWindow: BrowserWindow, params: DownloadParams) => {
    const { url, uuid, directory } = params;
    electronDl
      .download(mainWindow, url, {
        directory,
        onStarted: item => {
          this.downloadItemMap[uuid] = item;
          if (directory) {
            item.setSavePath(directory);
          }
        },
        onProgress: progress => {
          console.log(progress);

          mainWindow.webContents.send("download-progress", { progress, uuid });
        }
      })
      .then(dl =>
        mainWindow.webContents.send("download-complete", {
          savePath: dl.getSavePath(),
          uuid
        })
      );
  };
}

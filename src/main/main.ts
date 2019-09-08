import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import Download from "./download";
import logger from "../shared/logger";

// 创建全局变量并在下面引用，避免被GC
let win: BrowserWindow | null = null;

let tray: Tray | null = null;
let trayIcon = nativeImage.createFromPath(
  path.join(__dirname, `${isDev ? "../resource" : "./resource"}/icons/app.ico`)
);
function createTray() {
  tray = new Tray(trayIcon);
  tray.setToolTip("我的app");
  const menuTemplate = [
    {
      label: "显示主界面",
      click: () => {
        if (win) {
          win.show();
        }
      }
    },
    {
      label: "退出",
      click: () => {
        app.quit();
      }
    }
  ];
  const contextMenu = Menu.buildFromTemplate(menuTemplate);

  tray.on("right-click", () => {
    (tray as Tray).popUpContextMenu(contextMenu);
  });
  tray.on("click", (event, bounds, position) => {
    if (win) {
      win.show();
    }
  });
}
function createWindow() {
  // 创建浏览器窗口并设置宽高
  win = new BrowserWindow({
    icon: trayIcon,
    width: 800,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // 下载注册
  new Download().init(win);

  win.webContents.on("did-finish-load", () => {
    (win as BrowserWindow).show();
  });

  // 加载页面

  win.loadURL(
    isDev ? `http://localhost:9000/index.html` : `${__dirname}/index.html`
  );

  // 添加window关闭触发事件

  win.on("closed", () => {
    win = null; // 取消引用
  });
}
let trayFlashTimer: any = null;
// 托盘闪动
function trayFlash() {
  let count = 0;
  stopTrayFlash();
  trayFlashTimer = setInterval(() => {
    count += 1;
    if (count % 2 === 0) {
      (tray as Tray).setImage(trayIcon);
    } else {
      (tray as Tray).setImage(nativeImage.createEmpty()); // 创建一个空的nativeImage实例
    }
    (tray as Tray).setToolTip("您有新消息");
  }, 500);
}
// 停止托盘闪动
function stopTrayFlash() {
  if (trayFlashTimer) {
    clearInterval(trayFlashTimer);
  }
  (tray as Tray).setImage(trayIcon);
  (tray as Tray).setToolTip("我的app");
}

// 初始化后 调用函数
app.on("ready", () => {
  createTray();
  createWindow();
  logger.info("app初始化-----");
});

// 当全部窗口关闭时退出。
app.on("window-all-closed", () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});

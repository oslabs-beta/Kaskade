"use strict";
const electron = require("electron");
const path = require("node:path");
const fs = require("node:fs");
require("child_process");
process.env.DIST = path.join(__dirname, "dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  electron.ipcMain.handle("read-data-file", () => {
    return fs.readFileSync(path.join(__dirname, "../datafile.json"), "utf8");
  });
  electron.ipcMain.handle("kaskade-start", async (event, opts) => {
    const result = new Promise((resolve, reject) => {
      const child = electron.utilityProcess.fork(path.join(__dirname, "child.js"));
      child.postMessage(opts);
      child.on("message", (data) => {
        console.log("data in main.js", data);
        resolve(data);
      });
    });
    return result;
  });
  electron.ipcMain.on("write-data-file", (event, content) => {
    fs.writeFileSync(path.join(__dirname, "../datafile.json"), content);
  });
  win = new electron.BrowserWindow({
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.app.whenReady().then(createWindow);

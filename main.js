import { app, BrowserWindow, ipcMain, utilityProcess } from 'electron';
const {fork, spawn} = require('child_process');
import path from 'node:path'
import fs from 'node:fs'

process.env.DIST = path.join(__dirname, 'dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  ipcMain.handle('read-data-file', () => {
    return fs.readFileSync(path.join(__dirname, "../datafile.json"), "utf8"); 
  });

  ipcMain.handle('kaskade-start', async (event, opts) => {
    const result = new Promise((resolve, reject) => {
      const child = utilityProcess.fork(path.join(__dirname, 'child.js'))
      child.postMessage(opts);
      child.on('message', (data) => {
        console.log("data in main.js", data)
        resolve(data);
      })
    });
    return result;
  })

  ipcMain.on('write-data-file', (event, content) => {
      fs.writeFileSync(path.join(__dirname, "../datafile.json"), content);
  })
  win = new BrowserWindow({
    // icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })
  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

// import electron from 'electron';
// import { app, BrowserWindow, Menu } from 'electron';
// //check the below import statement
// import path from "path"
// const __dirname = path.resolve();

// const createWindow = () => {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       // why does path.join __dirname work?
//       preload: path.join(__dirname, 'preload.js' )
//     }
//   })
// // changed path from "./client/index.html"
//   win.loadFile('./client/index.html')
// }


// const isMac = process.platform === 'darwin'
// const template = [
//   // { role: 'appMenu' }
//   ...(isMac
//     ? [{
//         label: app.name,
//         submenu: [
//           { role: 'About' },
//           { type: 'separator' },
//           { role: 'services' },
//           { type: 'separator' },
//           { role: 'hide' },
//           { role: 'hideOthers' },
//           { role: 'unhide' },
//           { type: 'separator' },
//           { role: 'quit' }
//         ]
//       }]
//     : []),
//   // { role: 'fileMenu' }
//   {
//     label: 'File',
//     submenu: [
//       isMac ? { role: 'close' } : { role: 'quit' }
//     ]
//   },
//   // { role: 'editMenu' }
//   {
//     label: 'Edit',
//     submenu: [
//       { role: 'undo' },
//       { role: 'redo' },
//       { type: 'separator' },
//       { role: 'cut' },
//       { role: 'copy' },
//       { role: 'paste' },
//       ...(isMac
//         ? [
//             { role: 'pasteAndMatchStyle' },
//             { role: 'delete' },
//             { role: 'selectAll' },
//             { type: 'separator' },
//             {
//               label: 'Speech',
//               submenu: [
//                 { role: 'startSpeaking' },
//                 { role: 'stopSpeaking' }
//               ]
//             }
//           ]
//         : [
//             { role: 'delete' },
//             { type: 'separator' },
//             { role: 'selectAll' }
//           ])
//     ]
//   },
//   // { role: 'viewMenu' }
//   {
//     label: 'View',
//     submenu: [
//       { role: 'reload' },
//       { role: 'forceReload' },
//       { role: 'toggleDevTools' },
//       { type: 'separator' },
//       { role: 'resetZoom' },
//       { role: 'zoomIn' },
//       { role: 'zoomOut' },
//       { type: 'separator' },
//       { role: 'togglefullscreen' }
//     ]
//   },
//   // { role: 'windowMenu' }
//   {
//     label: 'Window',
//     submenu: [
//       { role: 'minimize' },
//       { role: 'zoom' },
//       ...(isMac
//         ? [
//             { type: 'separator' },
//             { role: 'front' },
//             { type: 'separator' },
//             { role: 'window' }
//           ]
//         : [
//             { role: 'close' }
//           ])
//     ]
//   },
//   {
//     role: 'help',
//     submenu: [
//       {
//         label: 'Learn More',
//         click: async () => {
//           const { shell } = require('electron')
//           await shell.openExternal('https://electronjs.org')
//         }
//       }
//     ]
//   }
// ]

// const menu = Menu.buildFromTemplate(template)
// Menu.setApplicationMenu(menu)

// app.whenReady()
//   .then(() => {
//     createWindow()

//     app.on('activate', () => {
//       if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//       }
//     })
//   })

//   app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//       app.quit()
//     }
//   })


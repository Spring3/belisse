'use strict';

// Import parts of electron to use
const { app, ipcMain, BrowserWindow } = require('electron');
const assert = require('assert');
const path = require('path');
const url = require('url');
require('dotenv').load({ silent: true });

const windowManager = require('./src-main/windows/index.js');
const sendTokenRequest = require('./src-main/requests/get-token.js');

assert(process.env.GH_CALLBACK_URL, '[env] Github callback url is undefined');
assert(process.env.SERVER_ORIGIN, '[env] Server origin url is undefined');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Keep a reference for dev mode
let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nativeWindowOpen: true
    }
  });

  // and load the index.html of the app.
  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL( indexPath );

  // Don't show until we are ready and loaded
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if ( dev ) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    switch(frameName) {
      case 'Github Authorization':
        event.preventDefault();
        const { browserWindow, response } = windowManager.windows.GITHUB_AUTH.open(mainWindow, options);
        event.newGuest = browserWindow;
        response
          .then(sendTokenRequest)
          .then((response) => {
            const clientId = response.headers.client;
            const accessToken = response.headers.token;
            const profile = response.body;
            console.log(clientId);
            console.log(accessToken);
            console.log(profile);
          });
        break;
      default:
        return;
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

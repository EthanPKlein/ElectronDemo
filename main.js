const { app, BrowserWindow, ipcMain, Tray } = require('electron')
const path = require('path')
const url = require('url')
const notifier = require('electron-notifications')

// var alarm = require('./alarm.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });
  win.setClosable(true);

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
   win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var fruits = ["banana", "apple", "grapes", "orange", "starfruit", "mango", "papaya", "strawberries"];

ipcMain.on('synchronous-message', (event, arg) => {
  win.flashFrame(true);
  var randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
  var date = new Date(Date.now());
  var response = `The server suggests <b>${randomFruit}</b> on ${date}!`;

  notifier.notify('Super Simple Fruit Picker', {
    icon: 'http://cl.ly/J49B/3951818241085781941.png',
    message: 'test'
  });

  event.returnValue = response;
})
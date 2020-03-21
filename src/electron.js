// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');
const jsonfile = require('jsonfile');
const { ipcMain } = require('electron');
const oracledb = require('oracledb');

const dbconfigPath = path.join(__dirname, "/../config/dbconfig.json");
const toDoListPath = path.join(__dirname, "/../config/todoList.json");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  // you can see the menubar
  //mainWindow.setMenu(null);

  // and load the index.html of the app.
  //mainWindow.loadFile('./src/index.html')
  mainWindow.loadFile( path.join(__dirname, '/index.html'))
  
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
  
  // Redux tool add
  BrowserWindow.addDevToolsExtension(
    path.join('C://Users/ParkJeongSu/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.5.0_0')
  )
  BrowserWindow.addDevToolsExtension(
    path.join('C://Users/ParkJeongSu/AppData/Local/Google/Chrome/User Data/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.17.0_0')
  )
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
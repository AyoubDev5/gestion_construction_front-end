const { app, BrowserWindow } = require("electron");
require("@electron/remote/main").initialize();
const path = require("path");

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 650,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      devTools: false,
    },
  });
  const deployURL = "https://illustrious-dolphin-04aa26.netlify.app/";
  mainWindow.setMenu(null);
  mainWindow.loadURL(deployURL);

  mainWindow.once("ready-to-show", () => mainWindow.show());
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);

import { app, BrowserWindow } from "electron";
import path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
app.commandLine.appendSwitch("proxy-bypass-list", "<local>;*,localhost:10001");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require("ws");

const createChatRoom = () => {
  const wss = new WebSocket.Server(
    {
      host: "localhost",
      port: 10001,
    },
    () => {
      console.log("websocket localhost;10001");
    }
  );

  wss.on("connection", function connection(ws) {
    console.log("connection", ws);
    ws.on("message", (msg) => {
      wss.clients.forEach(function each(client) {
        console.log("send:", client);
        client.send(`${msg}`);
      });
    });
    ws.send(
      JSON.stringify({
        name: "server",
        message: "启动",
        time: new Date().toLocaleString(),
      })
    );
  });

  wss.on("error", (err) => {
    console.error("error:", err.message);
  });

  // 服务器关闭事件监听
  wss.on("close", () => {
    console.log("close!");
  });
};

createChatRoom()

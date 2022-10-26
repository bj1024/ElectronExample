const { app, BrowserWindow } = require('electron')
const { shell } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // // リンクをクリックするとWebブラウザで開く
  // const handleUrlOpen = (e, url)=>{
  //   if( url.match(/^http/)){
  //     e.preventDefault()
  //     shell.openExternal(url)
  //   }
  // }
  // win.webContents.on('will-navigate', handleUrlOpen);  // 
  
    win.webContents.setWindowOpenHandler(({ url }) => {
      console.log("setWindowOpenHandler " + url)
      shell.openExternal(url);
      return { action: 'deny' };
    });
  
  
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
})

app.on('window-all-closed', () => {
  console.log("window-all-closed")
  // if (process.platform !== 'darwin') { // mac以外
        app.quit()
  // }

})





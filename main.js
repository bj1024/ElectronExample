const { app, BrowserWindow } = require('electron')
const { shell } = require('electron')

const express = require('express');
const exp = express();


const yyyymmdd = new Intl.DateTimeFormat(
  undefined,
  {
    year:   'numeric',
    month:  '2-digit',
    day:    '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  }
)



exp.use(express.static('public'));
exp.get('/', function (req, res) {
  // res.render(__dirname + '/index.html'); // render is template rendering.
  
  // res.status(200).send('hello.\nserver time=[' + yyyymmdd.format( new Date()) + ']')
  res.status(200).send(`hello.<br>server time=[${yyyymmdd.format( new Date())}]`)
});
exp.listen(3000,"127.0.0.1");

const createWindow = () => {
  console.log("createWindow")
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // const handleUrlOpen = (e, url)=>{
  //   if( url.match(/^http/)){
  //     e.preventDefault()
  //     shell.openExternal(url)
  //   }
  // }
  // win.webContents.on('will-navigate', handleUrlOpen);  // 

  // target='_blank',window.opwn
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

  // mainWindow = new BrowserWindow({width: 800, height: 600});
    // ログインページにアクセスして、画面に表示する
    // mainWindow.loadURL("http://localhost:3000/" );

    // mainWindow.on('closed', function() {
    //     mainWindow = null;
    // });

})

app.on('window-all-closed', () => {
  console.log("window-all-closed")
  // if (process.platform !== 'darwin') { // mac以外
        app.quit()
  // }

})

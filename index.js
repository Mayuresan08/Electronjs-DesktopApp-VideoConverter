var app = require("electron").app

const ipc = require('electron').ipcMain

const os =require('os')

const { dialog}=require('electron')

var BrowserWindow = require('electron').BrowserWindow

var mainWindow=null

app.on("ready",function(){
    mainWindow = new BrowserWindow({
        resizable:true,
        height:600,
        width:800,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
             enableRemoteModule: true
        }
    })
    mainWindow.loadURL("file://"+__dirname+'/main.html')

    mainWindow.on('closed',function(){
        mainWindow=null
    })
})

ipc.on("openDialog",function(event){
console.log("button pressed")

if(os.platform() === 'linux' || os.platform() === 'win32'){
    dialog.showOpenDialog(null,{
        properties:['openFile']
    }).then((result)=>{
        console.log(result.filePaths)
        event.sender.send("selected-file",result.filePaths[0])
    }).catch((err)=>{
        console.log(err)
    })

}

})
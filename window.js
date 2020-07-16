const {app, BrowserWindow}= require('electron')

function createWindow(){
// Cria uma janela de navegação.
    let win= new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    })
    //Carrega home.html do aplicativo
    win.loadFile('home.html')
}

app.whenReady().then(createWindow)
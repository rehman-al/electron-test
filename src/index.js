const {app, BrowserWindow, ipcMain, MessageChannelMain, Menu} = require('electron');
const path = require('node:path');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    let mainMenuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Add item',
                    click() {
                        createAddWindow()
                    }
                },
                {
                    label: 'Remove item'
                },
                {
                    label: 'Quit',
                    accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        }]

    if (process.env.ENV_DEV !== 'production') {
        mainMenuTemplate.push({
            label: 'Developer',
            submenu: [
                {
                    label: 'devTools',
                    accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                    click(item, focusWindow) {
                        focusWindow.webContents.toggleDevTools();
                    }
                },
                {
                    role: 'reload'
                }
            ]
        })
    }

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu)
    mainWindow.loadFile(path.join(__dirname, 'index.html'));


    mainWindow.on('closed', () => {
        app.quit();
    });
    mainWindow.webContents.openDevTools();
};


const createAddWindow = () => {
    let subWindow = new BrowserWindow({
        width: 300,
        height: 300,
        title: 'Add shopping list items',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    subWindow.loadFile(path.join(__dirname, 'subWindow.html'));
    subWindow.on('closed', () => {
        subWindow = null
    })
}

const handleItem = (e, item) => {
    console.log(item)
}

app.whenReady().then(() => {
    createWindow();
    ipcMain.on('getItem', handleItem);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
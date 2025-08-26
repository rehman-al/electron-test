const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendItem: (item) => {
        return ipcRenderer.send('getItem', item);
    }
});

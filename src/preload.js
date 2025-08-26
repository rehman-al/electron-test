const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendItem: (item) => {
        return ipcRenderer.send('getItem', item);
    },
    getItem: (callback) => {
        return ipcRenderer.on('item', (_e, item) => {
            callback(item)
        });
    },
    removeItem: (callback) => ipcRenderer.on('remove-item', callback)
});

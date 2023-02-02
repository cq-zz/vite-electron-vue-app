const { app, BrowserWindow } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // mainWindow.loadFile('dist/index.html');
    mainWindow.loadURL(
        NODE_ENV === 'development'
        ? 'http://127.0.0.1:5173'
        : `file://${path.join(__dirname, '../dist/index.html')}`
    );

    // 打开开发者工具
    if (NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
        // 打开的窗口，那么程序会重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})
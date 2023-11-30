const { app, BrowserWindow } = require('electron');
const IS_DEV = process.env.NODE_ENV === 'development'

if (process.env.NODE_ENV === 'development') {
    // Additional development settings
    console.log('Running in development mode');
} else {
    // Additional production settings
    console.log('Running in production mode');
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadURL('http://localhost:5173/vitepress-unocss-starter/'); // Assuming VitePress is running on the default port

    win.webContents.openDevTools(); // Open DevTools - optional

    win.on('closed', () => {
        app.quit();
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

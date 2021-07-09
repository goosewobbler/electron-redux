/* eslint-disable no-console */
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { syncMain } from '@goosewobbler/electron-redux';
import { createReduxStore } from '../common/reduxStore';
import { increment } from '../features/counter/counterSlice';

const views = [];

async function createWindow(): Promise<void> {
  const preload = path.resolve(__dirname, './preload.js');
  const view = new BrowserWindow({
    show: false,
    width: 1380,
    height: 830,
    webPreferences: {
      contextIsolation: true,
      preload,
    },
  });
  const url = `file:///${__dirname}/index.html`;

  console.log('initialising view with preload', preload);

  view.webContents.openDevTools();

  view.once('ready-to-show', () => {
    console.log('ready to show');
    view.webContents.once('dom-ready', () => {
      console.log('dom ready');
    });
    view.show();
  });

  // Emitted when the window is closed.
  view.on('closed', () => {
    // Just close both if we close one
    app.quit();
  });

  console.log('loading url', url);
  void (await view.loadURL(url));
  views.push(view);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  const store = createReduxStore(syncMain);

  store.subscribe(() => {
    // eslint-disable-next-line no-console
    console.log(store.getState());
  });

  setInterval(() => {
    store.dispatch(increment());
  }, 3000);

  void createWindow();
  void createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
});

const { BrowserWindow } = require('electron');
const url = require('url');

function open(parent, options) {
  const config = Object.assign({}, options, {
    modal: true,
    parent,
    width: 400,
    height: 700,
    closable: true,
    titleBarStyle: 'default',
  });
  const authWindow = new BrowserWindow(config);
  const responsePromise = new Promise((resolve) => {
    authWindow.webContents.on('did-get-redirect-request', (event, oldURL, newURL, isMainFrame, httpResponseCode, requestMethod, referrer, headers) => {
      console.log(newURL);
      console.log(process.env.GH_CALLBACK_URL);
      if (newURL.includes(process.env.GH_CALLBACK_URL)) {
        authWindow.close();
        authWindow.destroy();
        const code = url.parse(newURL).query;
        resolve(code);
      }
    });
  });
  return {
    browserWindow: authWindow,
    response: responsePromise
  };
}

module.exports = {
  open
}

const { remote } = require('electron');
const Store = require('electron-store');

const storage = new Store({ encryptionKey: (process || remote.process).env.ENCRYPTION_KEY });

module.exports = storage;

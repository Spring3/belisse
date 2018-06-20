const { get } = require('./request.js');
const storage = require('../../src/storage.js');

module.exports = code => {
  if (storage.has('appId')) {
    return get(`${process.env.SERVER_ORIGIN}/auth/gh/callback?${code}&appId=${storage.get('appId')}`, true);  
  }
  return get(`${process.env.SERVER_ORIGIN}/auth/gh/callback?${code}`, true);  
} 

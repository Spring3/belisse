const { get } = require('./request.js');

module.exports = code => {
  return get(`${process.env.SERVER_ORIGIN}/auth/gh/callback?${code}`, true);
} 

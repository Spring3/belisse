const request = require('request-promise-native');

const get = (uri, full = false) => request({
  method: 'GET',
  uri,
  resolveWithFullResponse: full,
  json: true
}).catch(console.error); // TODO: Notify user in a graceful way

const post = (uri, body, full = false) => request({
  method: 'POST',
  uri,
  body,
  resolveWithFullResponse: full,
  json: true
}).catch(console.error) // TODO: Notify user in a graceful way

module.exports = {
  get,
  post
}

## Electron 3rd party OAuth example

The project is based on [my boilderplate](https://github.com/Spring3/basic-react-redux-electron-tailwindcss)

Because there is no clear info on the net about how to perform OAuth without keeping the client_id and client_secret client side, I am making this unsuccessful research project public so that some people could reuse the approach.

I called it unsuccessful, because due to some use cases that I realized I would not achieve in my idea, I stopped the development.

Github is taken as an OAuth server.

Server implementation can be found [here](https://github.com/Spring3/belisse-server)

P.S. I do not vouch for optimal security here, but at least this seems like better than what I saw on the net.

The approach is the following:
- In Github OAuth app, set Redirect Url to http://localhost
- When the users clicks the Sign in button, route them to the OAuth init url (on server)
- After the app Authorization, they will be redirected to http://localhost
- The electron browser window will get the ?code query param and route it from the main process to the server's callback endpoint
- The server will exchange it for a token server side and return a token + the application id (to identify the app) as an `Application` and `Authorization` headers. Refer to [the window](https://github.com/Spring3/belisse/blob/develop/src-main/windows/gh-auth-window.js#L17) and [the request](https://github.com/Spring3/belisse/blob/develop/src-main/requests/get-token.js#L5) if you need just that part
- As a result, access_token is obtained as a response from the server and we don't keep any data on client except the server address

Don't forget to set your server address in .env.tpl file after you deploy it. Refer to [dotenv](http://npmjs.com/package/dotenv) for usage

I hope you will find it usefull and good luck with your project

P.S. Github does not provide the way to authorize for native apps (like Google does), so maybe at the time of reading, there is a better and safer approach

const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
//use the static files from public
// app.use() configures your application to use a middleware function (we’ll get into middleware in the next section). At a high level, app.use() says for every request to the server, always run the function passed into app.use()


const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};
//middleware

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
};

app.use(urlLogger, timeLogger);

app.get('/', (request, response) => {
  response.send('hello world');
});


app.get('/sunsets', (request, response) => {
  response.sendFile('/Users/lauracaroselli/turing/mod-4/express-tutorial/public/assets/sunset.png')
});

app.get('/json', (request, response) => {
  response.status(200).json({"name": "Laura"});
});

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

app.use((request, response) => {
  response.status(404).send('Page Not Found.')
});

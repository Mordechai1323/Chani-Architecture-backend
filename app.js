const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middlewares/credentials');

const { routesInit } = require('./routes/configRoutes');
const { checkCompletionDates } = require('./middlewares/checkCompletionDates');

require('./db/mongoConnect');

const app = express();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

routesInit(app);

schedule.scheduleJob('0 6 * * *', async () => {
  await checkCompletionDates();
});

const server = http.createServer(app);

let port = process.env.PORT || 3002;

server.listen(port, () => {
  console.log(`server run on port ${port}`);
});

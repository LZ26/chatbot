const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const PORT = process.env.PORT || 3000;
const app = express();
const socketio = require('socket.io');

const createApp = () => {
  app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const error = new Error('NOT FOUND');
      error.status = 404;
      next(error);
    } else {
      next();
    }
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const serverListen = () => {
  const server = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  );

  const io = socketio(server);
  require('./socket')(io);
};

const syncDb = () => db.sync();

async function startApp() {
  await syncDb();
  await createApp;
  await serverListen();
}

if (require.main === module) {
  startApp();
} else {
  createApp();
}

module.exports = app;

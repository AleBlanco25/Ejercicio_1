const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { usersRouter } = require('../routes/users.routes');
const { repairsRouter } = require('../routes/repairs.routes');
const { db } = require('../database/db');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const { initModel } = require('./init.model');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      users: '/api/v1/users',
      repairs: '/api/v1/repairs',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
  }

  routes() {
    this.app.use(this.paths.users, usersRouter);
    this.app.use(this.paths.repairs, repairsRouter);

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`can't find ${req.originalUrl} on this server`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    initModel();

    db.sync()
      .then(() => console.log('database synced'))
      .catch(error => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;

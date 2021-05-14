import compression from 'compression';
import express from 'express';
import session from 'express-session';

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const app = express();
app.use(compression())

app.set('trust proxy', true);

app.use(
  session({
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
app.use(express.json());
app.use(express.raw({ limit: '10mb' }));

app.use((_req, res, next) => {
  res.header({
    'Cache-Control': 'max-age=0, no-transform',
    Connection: 'close',
  });
  return next();
});

app.use('/api/v1', apiRouter);
app.use(staticRouter);

export { app };
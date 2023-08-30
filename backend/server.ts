require('dotenv').config();
import express from 'express';
import routes from './src/routes/index';

const server = express();

server.use(routes);

const port = +process.env.PORT || 8000;
server.listen(port, () => {
  console.debug(`Local server running on: http://localhost:${port}`);
});
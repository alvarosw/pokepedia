import express from 'express';
import routes from './src/routes/index';

const server = express();

server.use(routes);

const port = 8000;
server.listen(port, () => {
  console.debug(`Server running on: http://localhost:${port}`);
});
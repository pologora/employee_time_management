/* eslint-disable no-console */
const dotenv = require('dotenv');
const connectBase = require('./utils/connectBase');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

connectBase();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server running on port: ${port}`));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHADLER REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

/* eslint-disable no-console */
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const { connectDB } = require('./config/db');

const app = require('./app');

connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server runs on port: ${port}`);
});

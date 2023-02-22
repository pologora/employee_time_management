const dotenv = require('dotenv');
const connectBase = require('./utils/connectBase');

dotenv.config({ path: './config.env' });

const app = require('./app');

connectBase().catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port: ${port}`));

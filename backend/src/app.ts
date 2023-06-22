import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hi from server' });
});

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});

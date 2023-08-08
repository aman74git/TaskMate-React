require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: 'false' }));
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/todo', require('./routes/todo'));

app.get('/', (req, res) => {
  res.status(400).send('hello');
});

app.all('*', (req, res) => {
  res.status(404).send('404 not found');
});

app.listen(process.env.PORT, () =>
  console.log(`listening on port http://localhost:${process.env.PORT}`)
);

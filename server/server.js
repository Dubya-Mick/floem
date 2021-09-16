const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/users.js');

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
})

app.use('/users', userRouter);


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Oopsy Daisy',
    status: 500,
    message: { err: 'An error occured uwu' }
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
})

app.listen(3000)
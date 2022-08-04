require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

// connecting to the database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log(`Connected to ${conn.connection.host}`);
    // listening for requests
    app.listen(port, () => {
      console.log(`Listening for requests on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using Routes
app.use('/api', require('./routes/transactionsRoute'));
app.use('/', require('./routes/userRoute'));
app.get('*', (req, res) =>
  res.status(200).json({ msg: 'Welcome from express' })
);

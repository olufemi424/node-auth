const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoute')

dotenv.config({ path: './config/config.env' });

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iyvq7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => { 
    console.log(`DB connected: ${result.connection.host}`);
    app.listen(process.env.PORT)
  })
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// // cookies 
// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser=true')
//   res.cookie('newUser', false)
//   res.cookie('isEmployee', true, { 
//     maxAge: 1000 * 60 * 60 * 24, 
//     httpOnly: true,
//     // secure: process.env.NODE_ENV !== 'production' // only over https in production
//   })
//   res.send('you got the cookies')

// })

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;

//   console.log(cookies)
//   res.json(cookies)
// })

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authroutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./authreq');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://inkkelly:kelly.j.ke@cluster0.v4ttnn7.mongodb.net/portfolio?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
// app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.use(authRoutes);

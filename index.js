const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authroutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser, preventUser } = require('./authreq');

const app = express();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// database connection
const dbURI =
  'mongodb+srv://inkkelly:kelly.j.ke@cluster0.v4ttnn7.mongodb.net/portfolio?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.use(preventUser, '/get/blogs');
app.use(preventUser, '/get/blogs/:id');
app.use(preventUser, '/get/messages');
app.use(preventUser, '/get/users');
app.use(preventUser, '/post/blog');
app.use(preventUser, '/put/blogs/:id');
app.use(preventUser, '/delete/blogs/:id');

app.use(authRoutes);

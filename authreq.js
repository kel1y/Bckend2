const jwt = require('jsonwebtoken');
const User = require('./user');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'backend', (err, decodedToken) => {
      if (err) {
          'pass'
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    // res.redirect('/login');
    'pass'
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'backend', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        // console.log(decodedToken.id);
        // console.log(user.email);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const preventUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'backend', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        if(user.email != "admin@gmail.com"){
          res.status(400).json({ error: 'Login as Admin' });
        }
        res.locals.user = user;
        return;
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser, preventUser };

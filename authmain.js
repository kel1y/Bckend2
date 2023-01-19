const { User, Blog, Like, Comment, Message } = require('./user');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'backend', {
    expiresIn: maxAge,
  });
};



module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

// module.exports.dashboard_post = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   if (email != 'admin@gmail.com' || password != 'test123') {
//     res.status(400).json({ error: 'email was not for admin' });
//   } else {
//     res.status(400).json({ status: 'login successful' });
//   }


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
  res.status(200);
};

module.exports.get_blogs = async (req, res) => {
  try {
    const result = await Blog.find();
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not found record',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'Records found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.get_likes = async (req, res) => {
  try {
    const result = await Like.find();
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not found record',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'likes found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.get_comments = async (req, res) => {
  console.log(User.email);
  try {
    const result = await Comment.find();
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not found record',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'Records found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.get_messages = async (req, res) => {
  try {
    const result = await Message.find();
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not found record',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'Records found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.get_users = async (req, res) => {
  try {
    const result = await User.find();
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not found record',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'Records found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.getblogs_id = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Blog.findById(_id);
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not blog found',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'blog found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.put_blog = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Blog.findByIdAndUpdate(_id, req.body, { new: true });
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'Not found record',
        data: result,
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'Records found',
        data: result,
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.delete_blog = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Blog.findByIdAndDelete(_id);
    if (!result) {
      res.json({
        status: 'Failed',
        message: 'blog was not deleted ',
      });
    } else {
      res.json({
        status: 'SUCCESS',
        message: 'blog deleted',
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(404).json({ errors });
  }
};

module.exports.post_message = async (req, res) => {
  const data = new Message(req.body);
  const result = await data.save();

  if (!result) {
    res.json({
      status: 'FAILED',
      message: 'Message not saved',
    });
  } else {
    res.json({
      status: 'SUCCESS',
      message: 'Message successfully saved....',
      data: result,
    });
  }
};

module.exports.post_blog = async (req, res) => {
  const data = new Blog(req.body);
  const result = await data.save();

  if (!result) {
    res.json({
      status: 'FAILED',
      message: 'blog not saved',
    });
  } else {
    res.json({
      status: 'SUCCESS',
      message: 'blog successfully saved....',
      data: result,
    });
  }
};

module.exports.post_like = async (req, res) => {
  const data = new Like(req.body);
  const result = await data.save();

  if (!result) {
    res.json({
      status: 'FAILED',
      message: 'like not saved',
    });
  } else {
    res.json({
      status: 'SUCCESS',
      message: 'like successfully saved....',
      data: result,
    });
  }
};

module.exports.post_comment = async (req, res) => {
  const data = new Comment(req.body);
  const result = await data.save();

  if (!result) {
    res.json({
      status: 'FAILED',
      message: 'comment not saved',
    });
  } else {
    res.json({
      status: 'SUCCESS',
      message: 'comment successfully saved....',
      data: result,
    });
  }
};

const { Router } = require('express');
const authController = require('./authmain');

const router = Router();

router.post('/user/signup', authController.signup_post);
router.post('/user/login', authController.login_post);
router.get('/user/logout', authController.logout_get);
router.post('/dashboard', authController.dashboard_post);
router.get('/get/blogs', authController.get_blogs);
router.get('/get/blogs/:id', authController.getblogs_id);
router.get('/get/messages', authController.get_messages);
router.get('/get/comments', authController.get_comments);
router.get('/get/likes', authController.get_likes);
router.get('/get/users', authController.get_users);
router.post('/post/blog', authController.post_blog);
router.post('/post/message', authController.post_message);
router.post('/post/like', authController.post_like);
router.post('/post/comment', authController.post_comment);
router.put('/put/blogs/:id', authController.put_blog);
router.delete('/delete/blogs/:id', authController.delete_blog);

module.exports = router;

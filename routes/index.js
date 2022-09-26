var express = require('express');
var router = express.Router();

const articleController = require('../controllers').article;
const topicController = require('../controllers').topic;
const userController = require('../controllers').user;
const statusController = require('../controllers').status;
const validateUser = require('../middleware/verifySignUp');
const validateToken = require('../middleware/verifyJwtToken');
const userTopicController = require('../controllers').usertopic;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//User
router.post('/api/auth/signup',[
	validateUser.checkDuplicateUserNameOrEmail
],
userController.signup);

router.post('/api/auth/signin', userController.signin);

//Article
router.get('/api/article', articleController.list);
router.post('/api/article/detail', articleController.get_detail);
router.post('/api/article/add',[validateToken.verifyToken], articleController.add);
router.get('/api/articles/trendings', articleController.trending);



router.get('/api/article/get/selected', articleController.selected);
router.get('/api/article/get/newest', articleController.newest);
router.get('/api/article/get/popular', articleController.popular);
// router.post('/api/article/get/id', articleController.getById);




//Topic
router.get('/api/topic', topicController.list);
router.post('/api/topic/add',[validateToken.verifyToken], topicController.add);

//UserTopic
router.get('/api/user/topic', [validateToken.verifyToken],userTopicController.list);
router.post('/api/user/topic/add',[validateToken.verifyToken],userTopicController.add);

// module.exports = function (app) {

// faker 

router.get('/test/faker/user', userTopicController.list);


module.exports = router;

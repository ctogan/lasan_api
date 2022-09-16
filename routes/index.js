var express = require('express');
var router = express.Router();

const articleController = require('../controllers').article;
const topicController = require('../controllers').topic;
const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const statusController = require('../controllers').status;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;
const userTopicController = require('../controllers').usertopic;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Article
router.get('/api/article', articleController.list);
router.get('/api/article/get/recommended', articleController.recommended);
router.get('/api/article/get/selected', articleController.selected);
router.get('/api/article/get/newest', articleController.newest);
router.get('/api/article/get/popular', articleController.popular);
router.post('/api/article/get/id', articleController.getById);
router.post('/api/article/add', articleController.add);



//Topic
router.get('/api/topic', topicController.list);
router.post('/api/topic/add', topicController.add);

//UserTopic
router.get('/api/user/topic', userTopicController.list);
router.post('/api/user/topic/add', userTopicController.add);

// module.exports = function (app) {

//User Auth
router.post('/api/auth/signup',[
		verifySignUpController.checkDuplicateUserNameOrEmail,
		verifySignUpController.checkRolesExisted
	],
verifySignController.signup);

router.post('/api/auth/signin', verifySignController.signin);

// }

module.exports = router;

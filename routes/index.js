var express = require('express');
var router = express.Router();

const articleController = require('../controllers').article;
const topicController = require('../controllers').topic;
const userController = require('../controllers').user;
const statusController = require('../controllers').status;
const homeController = require('../controllers').home;
const validateUser = require('../middleware/verifySignUp');
const validateToken = require('../middleware/verifyJwtToken');
const userTopicController = require('../controllers').usertopic;
const authController = require('../controllers').auth;
const {OAuth2Client} = require('google-auth-library');
const User = require('../models').User;
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const client = new OAuth2Client('466171963780-if78nhnamd4if7uadurdiijp7v2spcoh.apps.googleusercontent.com' , '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' , 'http://127.0.0.1:3000/login');

const passport = require("passport");
const { user } = require('../models/user');
const db = require('../models');
require("./passport")(passport);
const jwt = require('jsonwebtoken');
const config_roles = require('../config/configRoles.js');


/* home*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/api/author/recommedation', homeController.author_recommendation);

// router.post(
// 	"/api/auth/google",
// 	passport.authenticate("google", { scope: ["email", "profile"] })
// );
// router.get(
// 	"/auth/google/callback",
// 	passport.authenticate({ session: false }),
// 	(req, res) => {
// 	res.redirect("/profile/");
// 	}
// )
router.get('/callback/url' , function(req , res){
	console.log(req);
	return true;
})
router.post("/api/auth/google", async (req, res) => {	
	try {
		const response = await client.getToken(req.body.code);
		// console.log(response.tokens.id_token);
		async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: response.tokens.id_token,
			audience: '466171963780-if78nhnamd4if7uadurdiijp7v2spcoh.apps.googleusercontent.com',
		});
		const { name,family_name,given_name, email, picture, sub } = ticket.getPayload();
		// console.log(ticket);

	
		User.findOne({
            where: {
                email: email
            }
        }).then(user => {
			if (!user) {
				const addAuthUser = User
				.create({
					uuid: uuid.v4(),
					first_name: name,
					last_name: family_name,
					avatar: picture,
					username: given_name,
					email: email,
					password: '',
					phone: '',
					is_verified:false,
					slug: given_name,
					gender: 'male',
					occupation:''
				})
				.then((User) => {
				
					const user_id = User.dataValues.id;
			
				})
				.catch((error) => res.status(400).send(error));
			}else{
				var user_id = user.id;	
			}
			
				var token = 'Bearer ' + jwt.sign({
					id: user_id
				}, config_roles.secret, {
					expiresIn: 86400 //24h expired
				});	

				console.log(token);
				User.update({token: token},{
					where:{
						id: user_id
				}});
			res.cookie('ls_token', token,{
					httpOnly: true,
					maxAge: 24 * 60 * 60 * 1000
				});
			
				return res.status(200).json({
					auth: true,
					email: email,
					accessToken: token,
					message: "Success",
					errors: null
				});


		});


	  }
	  verify().catch(console.error);
	  } catch (error) {
		console.log('error', error);
	  }
})
router.post('/api/auth/google',authController.sign_google);


//User
router.post('/api/auth/signup',[validateUser.checkDuplicateUserNameOrEmail],authController.signup);
router.post('/api/auth/signin', authController.signin);
router.delete('/api/auth/signout',[validateToken.verifyToken],authController.signout);

//router.get('/api/user/profile/:uuid',userController.detail);
router.post('/api/user/profile',[validateToken.verifyToken],userController.profile);
router.get('/api/user/profile',[validateToken.verifyToken],userController.profile);
router.post('/api/user/follow',[validateToken.verifyToken],userController.follow);
// router.post('/api/user/unfollow',[validateToken.verifyToken],userController.unfollow);

router.get(
"/api/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);
// router.post('/api/auth/google', userController.google_sign);



//Article
router.get('/api/article', articleController.list);
router.post('/api/article/detail', articleController.get_detail);
router.post('/api/article/add',[validateToken.verifyToken], articleController.add);
router.get('/api/articles/trendings', articleController.trending);
// router.get('/api/articles/short/trendings', articleController.trending);
router.get('/api/article/get/selected', articleController.selected);
router.post('/api/article/get/related', articleController.trending);
router.get('/api/article/get/newest', articleController.newest);
router.get('/api/article/get/popular', articleController.popular);
router.post('/api/article/add/like',[
	validateToken.verifyToken
],articleController.like);
router.post('/api/article/add/archive',[
	validateToken.verifyToken
],articleController.archive);

router.post('/api/article/get/comment', articleController.get_comment);
router.post('/api/article/add/comment',[validateToken.verifyToken],  articleController.add_comment);
router.post('/api/article/reply/comment',[validateToken.verifyToken],  articleController.reply_comment);

// router.post('/api/article/comment/store' , function(req , res){
// 	console.log(req.body);
// 	return true;
// })

//Topic
router.get('/api/topic', topicController.list);
router.post('/api/topic/add',[validateToken.verifyToken], topicController.add);

//UserTopic
router.get('/api/user/topic', [validateToken.verifyToken],userTopicController.list);
router.post('/api/user/topic/add',[validateToken.verifyToken],userTopicController.add);


// module.exports = function (app) {

// faker 

// router.get('/test/faker/user', userTopicController.list);


module.exports = router;

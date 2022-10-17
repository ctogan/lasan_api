const db = require('../models/index');
const User = require('../models').User
const UserFollow = require('../models').UserFollows
// const Role = require('../models').Role

// const oAuth2Client = new google.Auth.OAuth2Client({
// 	clientId : '466171963780-if78nhnamd4if7uadurdiijp7v2spcoh.apps.googleusercontent.com',
// 	clientSecret: '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',
// 	redirect:'login'
// })
  

  

module.exports = {
	
	google_sign(req,res){
		// console.log(req.body.code);
		
		/*oAuth2Client.generateAuthUrl({
			access_type: "offline",
			prompt: "consent",
			scope: [
			  "https://www.googleapis.com/auth/userinfo.email",
			  "https://www.googleapis.com/auth/userinfo.profile"
			]
		});*/
		
	},
	profile(req,res){
		User.findOne({
			attributes:{exclude:['id']},
			where:{
				id: req.userId,
			},

		}).then((data) => {
			if (!data) {
				return res.status(200).send({
				  code    : 200,
				  status  : 'error',
				  message : 'User Not Found',
				  data    : []
				});
			  }
			  const result = {
				code    : 200,
				status: true,
				message: 'Success',
				data    : data,
				errors: null
			  }
			  return res.status(200).send(result);
		}).catch((error) => {
			res.status(400).send({
				status: false,
				message: 'Bad Request',
				errors: error
			});
		});
	},
	detail(req,res){
		// console.log(req.userId);
		
		User.findOne({
			attributes:{exclude:['id']},
			where:{
				uuid: req.params.uuid,
			},

		}).then((data) => {
			if (!data) {
				return res.status(200).send({
				  code    : 200,
				  status  : 'error',
				  message : 'User Not Found',
				  data    : []
				});
			  }
			 

			if(!req.userId){
				is_auth = false;
			 }else{
				is_auth = true;
			 }
			  const result = {
				auth : is_auth,
				status: req.userId,
				message: 'Success' ,
				data:data,
				errors: []
			  }
			  return res.status(200).send(result);
		}).catch((error) => {
			res.status(500).send({
				status: false,
				message: 'Bad Request',
				errors: error
			});
		});
	},

	follow(req,res){

		User
		.findOne({
			where:{
				uuid: req.body.uuid,
			},

		}).then((user) => {

			if (!user) {
				return res.status(200).send({
					code    : 200,
					status  : 'error',
					message : 'User Not Found',
					data    : []
				});
			}

			if(req.body.action == 'false'){
				UserFollow
				.create({
					user_id           	: req.userId,
					author_id        	: user.id,
				})
				var result = {
					code    : 200,
					status  : 'success',
					message : 'Success follow',
					data    : []
				}   
			}else{
				UserFollow.destroy({
					where: {
						user_id  	: req.userId,
						author_id   : user.id,
					}
				})
				var result = {
					code    : 200,
					status  : 'success',
					message : 'Success unfollow',
					data    : []
				}   
			}
			
			return res.status(200).send(result);         
			
		}).catch((error) => {
			res.status(500).send({
				status: false,
				message: 'Bad Request',
				errors: error
			});
		});

	},
	unfollow(req,res){

		 return UserFollow
		 .findOne( {
		   where: {
				user_id           	: req.userId,
				author_id        	: req.body.author_id,
			},
		 })
		 .then((data) => {

		   if (!data) {
			 return res.status(200).send({
			   code    : 200,
			   status  : 'error',
			   message : 'data not found',
			   data    : []
			 });
		   }
			UserFollow.destroy({
				where :{
					user_id 	: req.userId,
					author_id 	: req.body.author_id,
				}
		   })

		   return res.status(200).send({
				code    : 200,
				status  : 'success',
				message : 'data deleted',
				data    : []
		   });
		 })
		 .catch((error) => {
		   res.status(400).send({
			 status: false,
			 message: 'Bad Request',
			 errors: error
		   });
		 });
	},

}
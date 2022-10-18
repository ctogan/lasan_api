const User = require('../models').User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const google = require("googleapis");
const uuid = require('uuid');
const config_roles = require('../config/configRoles');
const slugify = require('slugify');
const options = {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: false,
  locale: 'en',
  trim: true,
}


module.exports = {

    signup(req, res) {
        User
           .create({
               uuid: uuid.v4(),
               first_name: req.body.firstname,
               last_name: req.body.lastname,
               avatar: req.body.avatar,
               username: req.body.username,
               email: req.body.email,
               password: bcrypt.hashSync(req.body.password, 8),
               phone: req.body.phone,
               is_verified:false,
               slug: slugify(req.body.username, options),
               gender: req.body.gender,
               occupation:req.body.occupation
           })
           .then((User) => res.status(201).send(User))
           .catch((error) => res.status(400).send(error));
   },
   signin(req, res) {
    return User
        .findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {

                return res.status(404).send({
                    auth: false,
                    email: req.body.email,
                    accessToken: null,
                    message: "Error",
                    errors: "User Not Found."
                });

            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({
                    auth: false,
                    email: req.body.email,
                    accessToken: null,
                    message: "Error",
                    errors: "Invalid Password!"
                });
            }

            var token = 'Bearer ' + jwt.sign({
                id: user.id
            }, config_roles.secret, {
                expiresIn: 86400 //24h expired
            });	

            User.update({token: token},{
                where:{
                    id: user.id
            }});
           res.cookie('ls_token', token,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            

            res.status(200).send({
                auth: true,
                email: req.body.email,
                accessToken: token,
                message: "Success",
                errors: null
            }); 

        }).catch(err => {
            res.status(500).send({
                auth: false,
                email: req.body.email,
                accessToken: null,
                message: "Error",
                errors: err
            });
        });
    },
    sign_google(req,res){
        
    },
    signout(req, res) {
		const ls_token = req.cookies.ls_token;
		// console.log(ls_token);
		return User
		.findOne({
			where:{
				token : ls_token
			}
		})
		.then(user => {
			User.update(
				{
					token: null
				},
				{
				where:{
					id: req.userId
				}
			}),
			res.clearCookie('ls_token')
			res.status(200).send({
				auth: false,
				message: "Logout Success",
				errors: null
			});
		})
		.catch((error)=>{
			res.status(400).send({
				status: false,
				message: 'Bad Request',
				errors: error
			});
		});

	},

}
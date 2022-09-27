const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = require('../models').User
const Article = require('../models').Article
// const Role = require('../models').Role

const Op = db.Sequelize.Op;
const config_roles = require('../config/configRoles');
const uuid = require('uuid');
const slugify = require('slugify')
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

	article_list(req,res){
		let limit = 20
		let offset = 0 + (req.body.page - 1) * limit
		Article.findAll({
			attributes: ['slug','title',['created_at','date'],'image',['reading_time','read_calculation']],
		})	
	},
    detail(req, res) {

        return User
        .findOne( {
          attributes: {exclude: ['id']},
          include: [],
          where: {
            uuid: req.body.uuid,
           },
        })
        .then((data) => {
          if (!data) {
            return res.status(200).send({
              code    : 200,
              status  : 'error',
              message : 'User Not Found',
              data    : []
            });
          }
          const result = {
            status: true,
            message: data,
            errors: null
          }
          return res.status(200).send(result);
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
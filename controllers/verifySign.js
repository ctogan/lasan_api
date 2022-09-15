const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');
const User = require('../models').User
const Role = require('../models').Role
const Op = db.Sequelize.Op;
const config = require('../config/configRoles');

module.exports = {
	signup(req, res) {
		return User
			.create({
                id: req.body.id,
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                username: req.body.username,
				email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
				password: bcrypt.hashSync(req.body.password, 8)
			}).then(user => {
				Role.findAll({
					where: {
						name: {
							[Op.or]: req.body.roles
						}
					}
				}).then(roles => {
					user.setRoles(roles).then(() => {
						res.status(200).send({
							auth: true,
							id: req.body.id,
							message: "User registered successfully!",
							errors: null,
						});
					});
				}).catch(err => {
					res.status(500).send({
						auth: false,
						message: "Error",
						errors: err
					});
				});
			}).catch(err => {
				res.status(500).send({
					auth: false,
					id: req.body.id,
					message: "Error",
					errors: err
				});
			})
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
				}, config.secret, {
					expiresIn: 86400 //24h expired
				});

				res.status(200).send({
					auth: true,
					email: req.body.email,
					accessToken: token,
					message: "Error",
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
	}
}
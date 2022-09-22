const User = require('../models').User
const config_roles = require('../config/configRoles');
const ROLEs = config_roles.ROLEs
const uuid = require('uuid');

module.exports = {
	checkDuplicateUserNameOrEmail(req, res, next) {
			User.findOne({
				where: {
					email: req.body.email
				}
			}).then(user => {
				if (user) {
					res.status(400).send({
						auth: false,
						id: req.body.id,
						message: "Error",
						errors: "Email is already taken!"
					});
					return;
				}
				next();
			});
	}
}
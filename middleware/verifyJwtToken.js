const jwt = require('jsonwebtoken');
const config_roles = require('../config/configRoles.js');

module.exports = {

	verifyToken(req,res,next){

		let tokenHeader = req.headers['x-access-token'];

		if (tokenHeader.split(' ')[0] !== 'Bearer') {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Incorrect token format"
			});
		}

		let token = tokenHeader.split(' ')[1];

		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}
		if(!token) {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Unauthorize user"
			});
		}
	   try{
			jwt.verify(token, config_roles.secret, (err, decoded) => {
				if (err) {
					return res.status(500).send({
						auth: false,
						message: "Error",
						errors: err
					});
				}
				req.userId = decoded.id;
				next();
			});
	
	   }catch(e){
				return res.status(400).send({
					auth: false,
					message: "Error",
					errors: "Token not valid"
				});
	   }
	}
	
}
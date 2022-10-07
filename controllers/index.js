const article = require('./article');
const topic = require('./topic');
const user = require('./user');
const home = require('./home');
const verifySignUp = require('../middleware/verifySignUp');
const verifyJwtToken = require('../middleware/verifyJwtToken');
const status = require('./status');
const usertopic = require('./usertopic');
const auth = require('./auth');

module.exports = {
    article,
    topic,
    verifySignUp,
    verifyJwtToken,
    status,
    usertopic,
    user,
    home,
    auth,

}

const {check, validationResult} = require('express-validator');

exports.signup = function(req, res) {
    
    return [
        check('name', 'Name is required').notEmpty(),
        check('password', 'Password is required').notEmpty(),
    ]
};

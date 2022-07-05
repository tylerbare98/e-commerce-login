
const {check, validationResult} = require('express-validator');

exports.signup = function(req, res) {
    
    return [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is required').notEmpty(),
        check("password", "Password must include one lowercase character," +
            " one uppercase character, a number, a special character," +
            " and be 8 chracters long")
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i")
    ]
};

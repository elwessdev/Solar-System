const {check, validationResult} = require('express-validator');

exports.SignUpRules = () => [
    check('email', 'email is required').notEmpty(),
    check('email', 'email is required').isEmail(),

    check('username', 'username is required ').notEmpty(),
    check('username', 'username is required ').isLength({
        max: 20,
        min: 3
    }),

    check('password', 'password is required ').isLength({
        max: 20,
        min: 6
    }),
];

exports.LoginRules = () => [

];


exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send({errors: errors.array()})
    }
    next();
}
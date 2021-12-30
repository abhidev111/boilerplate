const bcrypt = require('bcrypt')
const User = require('../models/user.model');


module.exports.register = async (req, res, next) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        })

        user.save((err, responseObj) => {
            if (err) {
              if (err.code == 11000) {
                res.status(422).send(['Duplicate email address found'])
              }
              else {
                return next(err);
        
              }
            }
            else {
              res.send({ status: 200, message: 'User registered successfully', results: responseObj });
            }
          })

        }
    catch (err) {
        console.log(err)
    }
}
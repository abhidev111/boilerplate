const bcrypt = require('bcrypt')
const User = require('../models/user.model');
const nodeMailer = require('nodemailer')
const crypto = require('crypto')

const {google} = require('googleapis')
const CLIENT_ID = "1079049625310-r4gr43gej57igrv6v489qbqon5vcp981.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//043n9Puk54o-CCgYIARAAGAQSNwF-L9IrgBt_a6LgZcsMLh-LZwH6uRGLv_yXJg5m-9XXkC0nOa72VZ595vGuCV_yHTAPk313LcA"

const  oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)

oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN })
const accessToken = oAuth2Client.getAccessToken()


var transporter = nodeMailer.createTransport({
  service : 'gmail',
  auth : {
    type: 'OAuth2',
    user : "sociallyblore@gmail.com",
    pass : "Socially123@blore",  //this isn't working if i put into .env
    clientId : CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken : REFRESH_TOKEN,
    accessToken : accessToken
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports.register = async (req, res, next) =>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            emailToken : crypto.randomBytes(64).toString('hex')
        })

        var mailOptions ={
          from : ' "Socially" <sociallyblore@gmail.com> ',
          to : user.email,
          subject : 'Socially -verify your email',
          html : `<h3> Hi ${req.body.fullName}, Thanks for registering with us. </h3> <h4>Please verify mail to continue..</h4> <a href="http://${req.headers.host}/auth/verify-email?token=${user.emailToken}">Click to verify your email</a>`
        }

        transporter.sendMail(mailOptions, (err,info)=>{
          if(err){
            console.log(err)
          }
          else{
            console.log(info)
          }
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
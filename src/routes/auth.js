const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt')


router.post("/register", async (req, res) => {

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        })

        const userCreated = await user.save();
        res.status(200).json(userCreated);
    }
    catch (err) {
        console.log(err)
    }

    await user.save();
    res.send("ok");
})


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName })
        //if user not found
        !user && res.status(404).json("User not found")

        //CHECK PASSWORD VALIDITY
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong password")

        //if user is valid it responds with a JWT token
        res.status(200).json({ "token": user.generateJwt() });
    }

    catch (err) {
        console.log(err)
    }
})

module.exports = router;
const router = require('express').Router();
const User = require('../models/user.model');
const jwtHelper = require('../config/jwtHelper')

console.log("hello")


//update user 
router.put("/:id",async(req,res)=>{

})

//delete user
//get a user
router.get('/userProfile', jwtHelper.verifyJwtToken,  (req, res, next)=> {   //function (req, res, next)
    User.findOne({ _id: req._id },
      (err, user) => {
        if (!user)
          return res.status(404).json({ status: false, message: "User record not found" });
        else
          return res.status(200).json({ status: true, user });
      }
    )
  
  });
//follow a user 
//unfollow a user

router.get("/users/:id",(req,res)=>{
    res.send("router info");
})

router.put("/users/:id",(req,res)=>{
    res.send("router info");
})

router.get("/users",(req,res)=>{
//getby username email    res.send("router info");
})

module.exports = router;

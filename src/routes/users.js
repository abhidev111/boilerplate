const router = require('express').Router();

console.log("hello")


//update user 
router.put("/:id",async(req,res)=>{

})

//delete user
//get a user
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

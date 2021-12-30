const router = require('express').Router();

console.log("hello")

router.post("/users/signup",(req,res)=>{
    console.log("hello inside");
    res.send("router info");
})

router.post("/login",(req,res)=>{
    res.send("router info");
})

router.post("/users/emailvrify",(req,res)=>{
    res.send("router info");
})

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

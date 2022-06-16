const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController.js")
const auth= require("../middleware/auth.js")

router.get("/test-me", function(req, res){
    console.log("test API")
    res.send({msg: "jay"})
});

router.post("/qwer", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", auth.authenticate, auth.authorise, userController.getUserData)
router.put("/users/:userId", auth.authenticate, auth.authorise, userController.updateUser)

router.post("/users/:userId/posts", userController.postMessage)


// router.delete('/users/:userId', userController.deleteUser)

module.exports = router;
const express = require ("express");
const router = express.Router();
const userController = require ('../controller/userController');
const {requireLoggedIn, isAdmin } = require("../middleware/userAuthMiddleware");


router.post("/register",userController.register);
router.post("/login", userController.login);

//users private routes
router.get("/userAuth", requireLoggedIn, (req, res)=>{
    res.status(200).send({ok: true})
})
//admin private routes
router.get("/adminAuth", requireLoggedIn, isAdmin, (req, res)=>{
    res.status(200).send({ok: true})
})




module.exports = router;
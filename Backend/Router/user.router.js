const express = require("express")
const auth = require("../middleware/auth")
const CanAccess = require("../middleware/CanAccess")
const routes = express.Router()
const {registerUser,loginUser,logoutUser} = require("../collections/user.collections")

routes.post("/register",registerUser)
routes.post("/login",loginUser)
routes.get("/logout",logoutUser)


module.exports = routes
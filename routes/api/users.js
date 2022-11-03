const express = require("express")

const router = express.Router()

const usersCtrl = require('../../controllers/api/users');

// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

////instead of creating a callback function like example below, we are putting that function in usersCtrl.create
//        //Example: router.post("/", (req,res) => {

//        //})

//Routes for signing up, logging in, and checking token
        //NOTE: 1st parameter is the path.  2nd parameter is the handler/helper function in "/controllers/api/users"

//when a post request is made to: /api/users , the create() function in "/controllers/api/users" executes
router.post("/", usersCtrl.create)

//when a post request is made to: /api/users/login , the login() functions execute
router.post("/login",usersCtrl.login)

//when a get request is made to : /api/users/check-token, the checkToken() functions execute 
router.get('/check-token', usersCtrl.checkToken);

// Insert ensureLoggedIn (middleware) on all routes that need protecting.  This ensures any requests made to the router are done by a "logged in" user.
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);


module.exports = router;
const express = require("express")

const router = express.Router()

const usersCtrl = require('../../controllers/api/users');

// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

//instead of creating a callback function like example below, we are putting that function in usersCtrl.create
        //Example: router.post("/", (req,res) => {

        //})


// whenever a request is made to: /api/users , the create() below will run
router.post("/", usersCtrl.create)

router.post("/login",usersCtrl.login)

// GET /api/users/check-token
router.get('/check-token', usersCtrl.checkToken);

// Insert ensureLoggedIn on all routes that need protecting
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);


module.exports = router;
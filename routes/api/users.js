const express = require("express")

const router = express.Router()

const usersCtrl = require('../../controllers/api/users');


//instead of creating a callback function like example below, we are putting that function in usersCtrl.create
        //Example: router.post("/", (req,res) => {

        //})


// whenever a request is made to: /api/users , the create() below will run
router.post("/", usersCtrl.create)


module.exports = router;
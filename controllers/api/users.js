const User  = require ("../../models/users")
const jwt = require("jsonwebtoken")


//*CREATING THE TOKEN FOR USER
async function create(req, res){
    try {
        //Add the user to the database
        const user = await User.create(req.body)
        //Create JWT token
        const token = createJWT(user)
        //send token to client
        res.json(token)
    } catch (error) {
        res.status(400).json(error)
    }
}

//user object below is coming from the body in the users-api.js

// function create(req, res){
//     res.json({
//         user: {
//             name: req.body.name,
//             email: req.body.email,
//         }
//     })
// }


/*-- Helper Functions, we can use both when a user signs up and when they log in: --*/
    //NOTE: There are several ways to specify the expiration of the JWT.  See docs for more info: https://www.npmjs.com/package/jsonwebtoken 
    //function returns JWT token
function createJWT(user) {
    return jwt.sign(
      // data payload/info
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }



module.exports = {
    create
}
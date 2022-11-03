const User  = require ("../../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


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

  
//log in controller function
  async function login(req, res){
    try {
        //finds user object by email
        const user = await User.findOne({email: req.body.email})
        //if no user found, throw error
        if (!user) throw new Error();
        //if user is found, compare bcrypt password in db to login form
        const match = await bcrypt.compare(req.body.password, user.password);
        //if passwords do not match, throw error
        if (!match) throw new Error();
        //if passwords match, run createJWT() function above to create json web token 
        res.json( createJWT(user) );
  } catch {
        res.status(400).json('Bad Credentials');
  }
}


//function to retrieve expiration date of token
function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}


//object to export functions above
module.exports = {
    create,
    login,
    checkToken
}
//Middleware function (called in server.js) that: 

  //1. Checks if there's a token sent in an Authorization header of the HTTP request. For additional flexibility, we'll also check for a token being sent as a query string parameter.

  //2. Verifies the token is valid and hasn't expired.
  
  //3. Decodes the token to obtain the user data from its payload.

  //4. Then finally, adds the user payload to the Express request object.


const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Check for the token being sent in a header or as a query parameter
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    // Remove the 'Bearer ' if it was included in the token header
    token = token.replace('Bearer ', '');
    // Check if token is valid and not expired
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      // If valid token, decoded will be the token's entire payload
      // If invalid token, err will be set
      req.user = err ? null : decoded.user;  
      // If your app cares... (optional)
      req.exp = err ? null : new Date(decoded.exp * 1000);  
      return next();
    });
  } else {
    // No token was sent
    req.user = null;
    return next();
  }
};
// Any route/controller action that accesses req.userneeds to ensure that the request is coming from a logged in user.

module.exports = function(req, res, next) {
    // Status code of 401 is Unauthorized
    if (!req.user) return res.status(401).json('Unauthorized');
    // A okay
    next();
  };
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
   const token = req.cookies.jwt;

   //  check json webtoken exist and is verified
   if (token) {
     jwt.verify(token, process.env.JWT_SECRETE, (err, decodedToken) => {
         if (err) {
            console.log(err.message);
            res.redirect('/login');
         } else {
            // console.log(decodedToken);
            next();
         }
      });
   } else {
      res.redirect('/login');
   }
}

// chech currentn user 
const checkUser = (req, res, next) => {
   const token = req.cookies.jwt;

   // check json webtoken exist and is verified
   if (token) {
      jwt.verify(token, process.env.JWT_SECRETE, async (err, decodedToken) => {
          if (err) {
            res.locals.user = null;
             next();
          } else {
             console.log(decodedToken)
             let user = await User.find({ 'id': decodedToken.id })
             res.locals.user = user;
             next();
          }
       });
    } else {
      res.locals.user = null;
      next()
    }
}

module.exports = { requireAuth, checkUser };
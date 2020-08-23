const User = require('../models/User')

// handle errors
const handleErrors = err => {
   let errors = { email: '', password:'' }

   // duplication error code 
   if (err.code === 11000) {
      errors.email = "that email is already taken";
      return errors;
   }

   // validation errors
   if (err.message.includes('user validation failed')){
      Object.values(err.errors).forEach(({ properties })=> {
         errors[properties.path] = properties.message
      })
   }
   return errors
}

module.exports.signup_get = (req, res) => {
   res.render('signup')
}

module.exports.login_get = (req, res) => {
   res.render('login')
}

module.exports.signup_post = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.create({
         email, password
      })

      res.status(200).json(user)
   } catch (error) {
      const errors = handleErrors(error)
      res.status(400).json(errors)
   }
}

module.exports.login_post = async (req, res) => {
   const { email, password } = req.body;
   console.log(email, password)
   res.send('user login')
}
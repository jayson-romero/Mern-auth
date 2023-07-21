import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//@function    Login/save token
//@route       /login
//@access      public
const login = asyncHandler(async (req, res) => {
   const {email, password} = req.body

   if (!email || !password) {
      res.status(404)
      throw new Error("complete registration")
   } 

   const user = await User.findOne({email}) 
   if(user && bcrypt.compareSync(password, user.password)){
      generateToken(res, user._id)
      res.status(200).json({
         _id: user._id,
         name: user.name,
         email: user.email,})
   }else {
      res.status(400);
      throw new Error('Invalid email or password');
    }
})

//@function    Register/
//@route       /register
//@access      public
const register = asyncHandler(async (req, res) => {

      const {name, email, password} = req.body

      if (!name || !email || !password) {
         res.status(404)
         throw new Error("complete registration")
      } 

      const userExist = await User.findOne({ email}) 
      if(userExist) {
         res.status(400);
         throw new Error('User already exists');
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user = await User.create({ 
         name,
         password: hash,
         email
      })

      if(user) {
         generateToken(res, user._id)
         res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,})
      }else {
         res.status(400);
         throw new Error('Invalid user data');
       }
})


//@function    Logout
//@route       /logout
//@access      public
const logout = (req, res) => {
   res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ 
       message: 'Logged out successfully',
       user: req.user      
      });
}



const generateToken = (res, userId) => {
   const token = jwt.sign({ userId }, process.env.JWT_SECRET);
 
   res.cookie('jwt', token, {
      maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour in this example)
      httpOnly: true, // Restrict cookie access to HTTP(S) only
      secure: true, // Only send the cookie over HTTPS
      sameSite: 'None', // Restrict cookie sending to same-site requests
     //secure: process.env.NODE_ENV !== 'development', // Use secure 
   });
 };

const getUser =  asyncHandler(async(req, res) => {
   const user = await User.findById(req.params.id).select('-password')
   res.status(200).json(user)
}) 




export { login, register, logout, getUser }
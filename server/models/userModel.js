import mongoose from 'mongoose';


const userShema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
},
{
   timestamps: true,
 }
)

const User = mongoose.model('User', userShema);
export default User;
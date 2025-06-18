import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from 'validator';
const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required:[true,"first name keno deo nai"],
    trim: true,
    minlength:[5,"first name must be 5 characters"],
    maxlength:20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required:true,
    min:[18, 'Must be at least 18, got {VALUE}'],
    max:60
  },
  email: {
    type: String,
    required:true,
    trim: true,
    lowercase:true,
    unique:[ true,"email common hoye gese"],
    // validate:{
    //   validator:function(value){
    //      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    //   },
    //   message:function(props){
    //     return `Email ${props.value} is not valid email`
    //   }
    // }
    validate:[validator.isEmail,'invalid email sent {VALUE}']
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase:true,
    enum: {
     values: ["USER", "ADMIN","SUPERADMIN"],
     message:"role is not valid. got {VALUE}"
    },
    default: "USER",
  },
},{
  versionKey:false,
  timestamps:true
}
);

export const User = model("User", userSchema);

import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs"
const addressSchema = new Schema<IAddress>({
  city: String,
  street: String,
  zip: Number,
},{
  _id:false
}
);

const userSchema = new Schema<IUser,UserStaticMethods,UserInstanceMethods>(
  {
    firstName: {
      type: String,
      required: [true, "first name keno deo nai"],
      trim: true,
      minlength: [5, "first name must be 5 characters"],
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Must be at least 18, got {VALUE}"],
      max: 60,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: [true, "email common hoye gese"],
      // validate:{
      //   validator:function(value){
      //      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      //   },
      //   message:function(props){
      //     return `Email ${props.value} is not valid email`
      //   }
      // }
      validate: [validator.isEmail, "invalid email sent {VALUE}"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: {
        values: ["USER", "ADMIN", "SUPERADMIN"],
        message: "role is not valid. got {VALUE}",
      },
      default: "USER",
    },
    address: {
      type:addressSchema
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userSchema.method('hashPassword',async function (plainPassword:string){
  const password = await bcrypt.hash(plainPassword,10)
return password
 
})
userSchema.static('hashPassword',async function (plainPassword:string){
  const password = await bcrypt.hash(plainPassword,10)
return password
})
userSchema.pre("save",async function(){
  console.log("inside pre save hook");
  this.password =await bcrypt.hash(this.password,10)
  console.log(this)
})

userSchema.post('save', function(doc) {
  console.log('%s has been saved', doc._id);
});
export const User = model<IUser,UserStaticMethods>("User", userSchema);

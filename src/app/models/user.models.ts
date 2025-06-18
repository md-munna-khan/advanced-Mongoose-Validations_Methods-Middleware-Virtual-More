import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
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
    required: true,
    trim: true,
    lowercase:true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase:true,
    enum: ["USER", "ADMIN","SUPERADMIN"],
    default: "USER",
  },
},{
  versionKey:false,
  timestamps:true
}
);

export const User = model("User", userSchema);

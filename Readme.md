# advanced-Mongoose-Validations_Methods-Middleware-Virtual-More
GitHub Link: https://github.com/Apollo-Level2-Web-Dev/advanced-note-app-with-mongoose/tree/module-7

## 18-1 Validations in Mongoose: Built-in and Custom validations [max/min]
- **Step-1 :** age add in interface typescript
![alt text](image.png)
- **Step-2 :** update models
![alt text](image-1.png)

![alt text](image-2.png)

# Mongoose Built-in Validations

Mongoose provides several built-in validators to ensure the data stored in your MongoDB database is clean and conforms to your application's rules.

Below is a list of commonly used built-in validations with examples.

---

##  Built-in Validators in Mongoose

| Validator | Purpose                          | Example |
|----------|----------------------------------|---------|
| `required` | Makes the field mandatory       | `{ name: { type: String, required: true } }` |
| `minlength` | Minimum string length          | `{ name: { type: String, minlength: 3 } }` |
| `maxlength` | Maximum string length          | `{ name: { type: String, maxlength: 50 } }` |
| `min` | Minimum number value                 | `{ age: { type: Number, min: 18 } }` |
| `max` | Maximum number value                 | `{ age: { type: Number, max: 60 } }` |
| `enum` | Value must be one from a list       | `{ role: { type: String, enum: ['admin', 'user'] } }` |
| `match` | Match string using regular expression | `{ email: { type: String, match: /.+\@.+\..+/ } }` |
| `validate` | Custom validator function       | `{ age: { type: Number, validate: v => v % 2 === 0 } }` |

---

## 📌 Example Usage

```js
cimport { model, Schema } from "mongoose";
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
```

## 18-2 More About Built-in validation, Making Custom Validations & Third party Validator Package

![alt text](image-3.png)

```js
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
  ```
  ## 18-3 Validate using Zod
```js
import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import { z } from "zod";

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

export const userRoutes = express.Router();
userRoutes.post("/create-user", async (req: Request, res: Response) => {
try {
    const body = await CreateUserZodSchema.parse(req.body)
  console.log(body ,"zod body")
  const user = await User.create(body);
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    user:{}
  });
} catch (error:any) {
   res.status(400).json({
    success: true,
    message: error.message,
    error
  });
}
});
```
  ![alt text](image-4.png)

  ## 18-4 Embedding in Mongoose
- **step1:** first create interface
```js
export interface IAddress {
  city: string;
  street: string;
  zip: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  address: IAddress;
}
```js
  ![alt text](image-5.png)
  - **step2:** second create schema
  ```js
  import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from "validator";

const addressSchema = new Schema<IAddress>({
  city: String,
  street: String,
  zip: Number,
},{
  _id:false
}
);

const userSchema = new Schema<IUser>(
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

export const User = model("User", userSchema);
```
  ![alt text](image-6.png)
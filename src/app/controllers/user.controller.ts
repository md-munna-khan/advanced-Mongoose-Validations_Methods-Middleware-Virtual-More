import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import { z } from "zod";
import bcrypt from "bcryptjs";
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
    // const zodbody = await CreateUserZodSchema.parse(req.body)
    const body = req.body;
    // const password = await bcrypt.hash(body.password,10)
    // console.log(password)
    // body.password =password
    // built it and custom instance methods
 
    //========================= this in instance method==============================
    // const user = new User(body);
    // user.hashPassword(body.password);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // await user.save();
     //=================== built it and custom static methods=====================
// const password = await User.hashPassword(body.password)
// console.log(password, "static")
// body.password = password

        const user = await User.create(body);
    res.status(201).json({
      success: true,
      message: "Note created Successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: true,
      message: error.message,
      error,
    });
  }
});
userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
// single id
userRoutes.get("/:usersId", async (req: Request, res: Response) => {
  const usersId = req.params.usersId;
  const users = await User.findById(usersId);

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
// update id
userRoutes.patch("/:usersId", async (req: Request, res: Response) => {
  const usersId = req.params.usersId;
  const updateUsers = req.body;
  const users = await User.findByIdAndUpdate(usersId, updateUsers, {
    new: true,
  });

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
// delete id
userRoutes.delete("/:usersId", async (req: Request, res: Response) => {
  const usersId = req.params.usersId;

  // const users = await User.findByIdAndDelete(usersId);
  const users = await User.findOneAndDelete({_id:usersId});


  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});

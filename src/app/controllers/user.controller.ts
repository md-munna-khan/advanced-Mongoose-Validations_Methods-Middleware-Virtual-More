import express, { Request, Response } from "express";
import { User } from "../models/user.models";



export const userRoutes = express.Router();
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  // approach -1 creating a database
  //   const myNote = new Note({
  //     title: "Learning Express",
  //     tags: {
  //       label: "database",
  //     },
  //   });
  //   await myNote.save();

  //approach-2
  const user = await User.create(body);
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    user,
  });
});
userRoutes.get("/", async (req: Request, res: Response) => {
  const users =await User.find();

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
// single id
userRoutes.get("/:usersId", async (req: Request, res: Response) => {
    const usersId=req.params.usersId
  const users =await User.findById(usersId);

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
// update id
userRoutes.patch("/:usersId", async (req: Request, res: Response) => {
    const usersId=req.params.usersId
    const updateUsers=req.body
  const users =await User.findByIdAndUpdate(usersId,updateUsers,{new:true});

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
// delete id
userRoutes.delete("/:usersId", async (req: Request, res: Response) => {
    const usersId=req.params.usersId
    
  const users =await User.findByIdAndDelete(usersId);

  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    users,
  });
});
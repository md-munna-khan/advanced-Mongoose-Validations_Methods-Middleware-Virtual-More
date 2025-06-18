import express, { Request, Response } from "express";
import { Note } from "../models/notes.models";


export const notesRoutes = express.Router();
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
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
  const note = await Note.create(body);
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    note,
  });
});

// all notes get
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    notes,
  });
});
// single note get
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // const note = await Note.findById(noteId)
  const note = await Note.findOne({ _id: noteId });
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    note,
  });
});
// update
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updateBody = req.body;
  // const note = await Note.findById(noteId)
  const note = await Note.findOneAndUpdate({ _id: noteId }, updateBody, {
    new: true,
  });
  // const note = await Note.updateOne({_id:noteId},updateBody,{new:true})
  // const note = await Note.findByIdAndUpdate(noteId,updateBody,{new:true})
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    note,
  });
});
// Delete
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  // const note = await Note.findById(noteId)
  const note = await Note.findByIdAndDelete(noteId);
  // const note = await Note.updateOne({_id:noteId},updateBody,{new:true})
  // const note = await Note.findByIdAndUpdate(noteId,updateBody,{new:true})
  res.status(201).json({
    success: true,
    message: "Note created Successfully",
    note,
  });
});
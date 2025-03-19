import express from "express";
import {
  getAllNotes,
  addNote,
  deleteNoteById,
} from "../controllers/notesController";

const router = express.Router();

// get
router.get("/notes", getAllNotes);
// post
router.post("/notes", addNote);
// delete
router.delete("/notes/:id", deleteNoteById);
//update
router.patch("/notes:id");

export default router;

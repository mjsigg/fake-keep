import express from "express";
import {
  getAllNotes,
  addNote,
  deleteNoteById,
  updateNotetById,
} from "../controllers/notesController";

const router = express.Router();

// get
router.get("/notes", getAllNotes);
// post
router.post("/notes", addNote);
// delete
router.delete("/notes/:id", deleteNoteById);
//update
router.put("/notes/:id", updateNotetById);

export default router;

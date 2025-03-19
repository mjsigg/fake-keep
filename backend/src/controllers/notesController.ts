import { Request, Response } from "express";
import { Note } from "../../types/note";
import { NoteService } from "../services/noteService";

export const getAllNotes = async (req: Request, res: Response) => {
  console.log("Received request to get all notes.");
  try {
    const notes = await NoteService.getAllNotes();
    res.status(200).json(notes);
    console.log("Successfully retrived notes: ", notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
};

export const addNote = async (req: Request, res: Response) => {
  console.log("Recived request to add a note.");
  try {
    const { title, text_body } = req.body;

    if (!title || !text_body) {
      return res
        .status(400)
        .json({ message: "Title and text_body are required" });
    }

    const newNote: Note = await NoteService.createNote(title, text_body);
    res.status(201).json(newNote);
    console.log("Successfully added new note:", newNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating note", error });
  }
};

export const deleteNoteById = async (req: Request, resp: Response) => {
  try {
    const { id } = req.params;
    if (!id) return resp.status(400).json({ message: "Note ID is required" });

    const deleted = await NoteService.deleteById(id);

    if (!deleted) return resp.status(404).json({ message: "Note not found" });

    resp.status(200).json({ message: "Note deleted successfully" });
  } catch (e) {
    console.error("Error deleting note.", e);
    resp.status(500).json({ message: "Error deleting note", e });
  }
};

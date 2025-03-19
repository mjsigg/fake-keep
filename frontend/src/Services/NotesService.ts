import { Note } from "../../types";

const VITE_EXPRESS_URL = import.meta.env.VITE_EXPRESS_URL;
const VITE_EXPRESS_PORT = import.meta.env.VITE_EXPRESS_PORT;
if (!VITE_EXPRESS_URL) throw new Error("Issue with express URL");
if (!VITE_EXPRESS_PORT) throw new Error("Issue with express URL");

export const getAllNotes = async () => {
  const response = await fetch(VITE_EXPRESS_URL);
  const data = await response.json();
  return data;
};

export const addNote = async (note: Note): Promise<Note> => {
  try {
    const response = await fetch(VITE_EXPRESS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Error posting note.");
    }

    const newNote: Note = await response.json();
    return newNote;
  } catch (e) {
    console.error("Error posting note:", e);
    throw e;
  }
};

export const deleteNoteById = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${VITE_EXPRESS_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting note.");
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

import NoteComponent from "../../Components/NoteComponent";
import { useState, useRef, useEffect } from "react";
import CreateNoteInputBar from "./CreateNoteInputBar";
import { Note } from "../../../types";
import * as FileService from "../../Services/NotesService";
import { Link } from "react-router-dom";

const NotesPage = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [notesList, setNotesList] = useState<Note[]>([]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const inputBarRef = useRef<HTMLDivElement>(null);

  const handleIsClicked = () => {
    setIsClicked(false);
    setSelectedNote(null);
  };

  const fetchNotes = async () => {
    try {
      const data = await FileService.getAllNotes();
      setNotesList(data);
    } catch (e) {
      console.error("Error fetching notes:", e);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="flex flex-col items-center h-screen bg-black/87 text-white/75">
      <section className="w-full max-w-xl mt-10" ref={inputBarRef}>
        <CreateNoteInputBar
          isClicked={isClicked}
          setIsClicked={setIsClicked}
          handleIsClicked={handleIsClicked}
          notesList={notesList}
        />
      </section>
      <section className="flex flex-wrap mt-4 w-full justify-start">
        {notesList.map((note) => (
          <Link
            to={`/notes/${note.id}`}
            key={note.id}
            className="border border-white p-2 rounded m-2 w-58"
            onClick={() => setSelectedNote(note)}
          >
            <h1>{note.title || "Title"}</h1>
            <h2>{note.text_body || "Note"}</h2>
          </Link>
        ))}
      </section>

      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <NoteComponent
            note={selectedNote}
            handleIsClicked={handleIsClicked}
            notesList={notesList}
            setNotesList={setNotesList}
          />
        </div>
      )}
    </main>
  );
};

export default NotesPage;

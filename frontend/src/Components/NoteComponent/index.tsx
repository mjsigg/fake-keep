import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as NoteService from "../../Services/NotesService";
import { Note } from "../../../types";

interface NoteProps {
  note?: Note;
  handleIsClicked: () => void;
  notesList: Note[];
  setNotesList: Note[];
}

const NoteComponent: React.FC<NoteProps> = ({
  note,
  handleIsClicked,
  notesList,
  setNotesList,
}) => {
  const [noteVals, setNoteVals] = useState<Note>(
    note ? { ...note } : { title: "", text_body: "" }
  );
  const [isTitleEditing, setisTitleEditing] = useState<boolean>(false);
  const [isbodyEditing, setisbodyEditing] = useState<boolean>(false);

  const noteRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (noteRef.current && !noteRef.current.contains(event.target as Node)) {
        try {
          if (!note) {
            const returnedNote = await NoteService.addNote(noteVals);
            console.log("Note created!", returnedNote);
          } else {
            const updatedNoteVals = { ...noteVals };
            // this should be the update part. need to update the time too
            console.log("Updating note....");
            setNoteVals(updatedNoteVals);
            await NoteService.updateNote(noteVals);
            const updatedList: Note[] = await NoteService.getAllNotes();
            console.log("Updating within use effect after fetching list");
            setNotesList(updatedList);
          }
          setNoteVals({ title: "", text_body: "" });
          handleIsClicked();
          navigate("/");
        } catch (e) {
          console.error("Error saving note:", e);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [noteVals, notesList, handleIsClicked, note, setNotesList, navigate]);

  return (
    <section
      ref={noteRef}
      // onBlur={handleIsClicked}
      className="flex flex-col rounded flex-wrap-2 overflow-hidden break-words"
    >
      {!isTitleEditing ? (
        <h2 className="p-1 break-words" onClick={() => setisTitleEditing(true)}>
          {noteVals.title || "Title"}
        </h2>
      ) : (
        <input
          className="w-full p-1"
          onChange={(e) => setNoteVals({ ...noteVals, title: e.target.value })}
          max={75}
          value={noteVals.title}
          placeholder="Title"
          autoFocus={isTitleEditing}
          onBlur={() => setisTitleEditing(false)}
        />
      )}

      {!isbodyEditing ? (
        <h2 className="w-full p-1" onClick={() => setisbodyEditing(true)}>
          {noteVals.text_body || "Enter note here..."}
        </h2>
      ) : (
        <textarea
          className="w-full p-1"
          value={noteVals.text_body}
          autoFocus={isbodyEditing}
          onBlur={() => setisbodyEditing(false)}
          placeholder="Note"
          onChange={(e) =>
            setNoteVals({ ...noteVals, text_body: e.target.value })
          }
        />
      )}

      <section className="flex border justify-end">
        {note && (
          <button
            onClick={async () => {
              if (note) {
                await NoteService.deleteNoteById(note.id);
                console.log("Note deleted.");
                handleIsClicked();
              }
            }}
            className="border px-1.5"
          >
            Delete Note
          </button>
        )}
        <button
          onClick={async () => {
            try {
              if (!note) {
                const returnedNote = await NoteService.addNote(noteVals);
                console.log("Note created!", returnedNote);
              } else {
                const updatedNoteVals = { ...noteVals };
                setNoteVals(updatedNoteVals);
                const updatedList: Note[] = await NoteService.getAllNotes();
                setNotesList(updatedList);
                navigate("/");
              }
              setNoteVals({ title: "", text_body: "" });
              noteRef.current = null;
              handleIsClicked();
              // navigate("notes");
            } catch (e) {
              console.error("Error saving note:", e);
            }
          }}
          className="border px-1.5"
        >
          Close
        </button>
      </section>
    </section>
  );
};

export default NoteComponent;

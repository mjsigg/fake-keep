import NoteComponent from "../../Components/NoteComponent";
import { Note } from "../../../types";

interface CreateNoteInputBarProps {
  isClicked: boolean;
  setIsClicked: (value: boolean) => void;
  handleIsClicked: () => void;
  notesList: Note[];
}

const CreateNoteInputBar: React.FC<CreateNoteInputBarProps> = ({
  isClicked,
  setIsClicked,
  handleIsClicked,
  notesList,
}) => {
  return (
    <div className="rounded border border-red-400 w-full p-2">
      {!isClicked ? (
        <div
          className="border border-white/50 py-1 px-3 rounded"
          onClick={() => setIsClicked(true)}
        >
          {"Take a note..."}
        </div>
      ) : (
        <NoteComponent
          handleIsClicked={handleIsClicked}
          notesList={notesList}
        />
      )}
    </div>
  );
};

export default CreateNoteInputBar;

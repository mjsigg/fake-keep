import NotesPage from "./Pages/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/notes/:id" element={<NotesPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/" element={<NotesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

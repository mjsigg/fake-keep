import NotesPage from "./Pages/Notes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/note/:id" element={<NotesPage />} />
          <Route path="/note" element={<NotesPage />} />
          <Route path="/" element={<NotesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

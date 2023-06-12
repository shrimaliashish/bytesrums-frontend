import { Routes, Route } from "react-router-dom";
import Book from "./components/Books";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;

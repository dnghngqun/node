import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddStudent from "./Components/AddStudent";
import GetAllStudent from "./Components/GetAllStudent";
import SearchStudentById from "./Components/SearchStudentById";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddStudent />}></Route>
        <Route path="/getall" element={<GetAllStudent />}></Route>
        <Route path="/search" element={<SearchStudentById />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

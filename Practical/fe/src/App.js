import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddStudent from "./Components/AddStudent";
import GetAllStudent from "./Components/GetAllStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddStudent />}></Route>
        <Route path="/getall" element={<GetAllStudent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

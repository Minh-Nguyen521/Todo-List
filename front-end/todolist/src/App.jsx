import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Index/Index.jsx";
import Login from "./Login/Login.jsx";
import "./css/index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // ✅ Only working route
import Navbar from "./Components/Navbar";
import NLogin from "./pages/NLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NLogin />} />

        {/* About & Contact not included here yet */}
      </Routes>
    </Router>
  );
}

export default App;

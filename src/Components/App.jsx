import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // ✅ Only working route
import About from "./pages/About";
import NLogin from "./pages/NLogin";
import Dashboard from "./pages/Dashboard";
import LawyerProfile from "./pages/LawyerProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lawyer/:id" element={<LawyerProfile />} />
        {/* About & Contact not included here yet */}
      </Routes>
     
    </Router>
  );
}

export default App;

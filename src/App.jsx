import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"; // ✅ Only working route
import About from "./pages/About";
import NLogin from "./pages/NLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NLogin />} />
        <Route path="/about" element={<About />} />
        {/* About & Contact not included here yet */}
      </Routes>
     
    </Router>
  );
}

export default App;

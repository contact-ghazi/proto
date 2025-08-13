import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Public
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import NLogin from "./pages/NLogin";
import LawyerProfile from "./pages/LawyerProfile";
import PeerVideoCall from "./Components/PeerVideoCall";

// Dashboard layout + pages
import DashboardLayout from "./pages/DashboardLayout";
import Lawyers from "./pages/Lawyers";
import Assigned from "./pages/Assigned";
import Messages from "./pages/Messages";
import Calls from "./pages/Calls";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import ActiveCall from "./pages/ActiveCall";
import AudioCall from "./pages/AudioCall";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<NLogin />} />
        <Route path="/login-old" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/lawyer/:id" element={<LawyerProfile />} />
        {/* kept for dev-only direct access */}
        <Route path="/video-call" element={<PeerVideoCall />} /> 

        {/* Dashboard shell */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="lawyers" replace />} />
          <Route path="lawyers" element={<Lawyers />} />
          <Route path="assigned" element={<Assigned />} />
          <Route path="chat" element={<Messages />} />
          <Route path="call" element={<Calls />} />             {/* history page */}
          <Route path="docs" element={<Documents />} />
          <Route path="settings" element={<Settings />} />
          {/* real-time video call page */}
          <Route path="call/active" element={<ActiveCall />} />
        </Route>

        {/* Standalone audio call page (voice-only like WhatsApp) */}
        <Route path="/audio-call" element={<AudioCall />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard/lawyers" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

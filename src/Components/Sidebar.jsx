import { Link } from "react-router-dom";
import { FaUserTie, FaUserCheck, FaFileAlt, FaCog, FaComments } from "react-icons/fa";
import "./Sidebar.css"; // External CSS


function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="sidebar-logo">Advocate AI</h2>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-link"><FaUserTie /> Find Lawyers</Link>
        <Link to="/assigned" className="nav-link"><FaUserCheck /> Assigned Lawyer</Link>
        <Link to="/consultations" className="nav-link"><FaComments /> Consultations</Link>
        <Link to="/documents" className="nav-link"><FaFileAlt /> Documents</Link>
        <Link to="/settings" className="nav-link"><FaCog /> Settings</Link>
      </nav>
    </div>
  );
}

export default Sidebar;

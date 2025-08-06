import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon, Info, MessageSquare, LogIn } from "lucide-react";

function TransNavbarAbout() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white flex justify-around py-2 shadow-lg z-50 border-t border-gray-700">
      
      {/* Home */}
      <Link to="/" className="flex flex-col items-center">
        <HomeIcon size={22} />
        <span className="text-xs">Home</span>
      </Link>

      {/* About */}
      <Link to="/about" className="flex flex-col items-center">
        <Info size={22} />
        <span className="text-xs">About</span>
      </Link>

      {/* Consult */}
      <Link
  to="/?scroll=immediate"
  className="flex flex-col items-center"
>
  <MessageSquare size={22} />
  <span className="text-xs">Consult</span>
</Link>

      {/* Sign In */}
      <Link to="/login" className="flex flex-col items-center">
        <LogIn size={22} />
        <span className="text-xs">Sign In</span>
      </Link>
    </div>
  );
}

export default TransNavbarAbout;

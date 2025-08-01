import { Link } from "react-router-dom";
import { HomeIcon, InformationCircleIcon, ChatBubbleOvalLeftEllipsisIcon, UserIcon } from "@heroicons/react/24/outline";

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/20 backdrop-blur-md text-white flex justify-around py-3 md:hidden z-50">
      {/* Home */}
      <Link to="/" className="flex flex-col items-center text-sm">
        <HomeIcon className="h-6 w-6" />
        <span>Home</span>
      </Link>

      {/* About */}
      <Link to="/about" className="flex flex-col items-center text-sm">
        <InformationCircleIcon className="h-6 w-6" />
        <span>About</span>
      </Link>

      {/* Immediate Consult */}
      <a
        href="#immediate-consult"
        className="flex flex-col items-center text-sm"
        onClick={(e) => {
          e.preventDefault();
          const section = document.getElementById("immediate-consult");
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
        <span>Consult</span>
      </a>

      {/* Sign In */}
      <Link to="/login" className="flex flex-col items-center text-sm">
        <UserIcon className="h-6 w-6" />
        <span>Sign In</span>
      </Link>
    </div>
  );
}

export default BottomNav;

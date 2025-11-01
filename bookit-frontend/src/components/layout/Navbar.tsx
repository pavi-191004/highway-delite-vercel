import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow-sm bg-white">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/hdlogo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-semibold text-gray-800 text-lg">highway delite</span>
      </Link>

      
    </nav>
  );
};

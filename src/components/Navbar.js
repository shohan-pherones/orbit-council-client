import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-sky-900">
      <Link
        to="/"
        className="text-xl font-semibold text-sky-400 hover:text-sky-50 duration-300"
      >
        Orbit Council
      </Link>

      <nav className="flex items-center gap-5">
        <div className="flex gap-5">
          <Link to="/login" className="hover:text-sky-400 duration-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-sky-400 duration-300">
            Signup
          </Link>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="bg-rose-500 py-2 px-5 rounded shadow-xl hover:bg-rose-50 hover:text-slate-900 duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

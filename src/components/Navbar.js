import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-sky-900">
      <Link
        to="/"
        className="text-xl font-semibold text-sky-400 hover:text-sky-50 duration-300"
      >
        Orbit Council
      </Link>
      <nav className="flex gap-5">
        <Link to="/login" className="hover:text-sky-400 duration-300">
          Login
        </Link>
        <Link to="/signup" className="hover:text-sky-400 duration-300">
          Signup
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;

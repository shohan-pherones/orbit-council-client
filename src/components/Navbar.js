import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-teal-900">
      <Link to="/" className="text-xl font-semibold text-teal-400">
        Orbit Council
      </Link>
    </div>
  );
};

export default Navbar;

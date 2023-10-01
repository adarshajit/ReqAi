import Theme from './Theme';
import { FaCrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar bg-base-200 fixed z-10">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Req AI
        </Link>
      </div>
      <div className="flex-none gap-6">
        <Link className="btn btn-neutral" to="/reqAi/pro">
          <span>
            <FaCrown />
          </span>
          Upgrade
        </Link>
        <Theme />
      </div>
    </div>
  );
};

export default Navbar;

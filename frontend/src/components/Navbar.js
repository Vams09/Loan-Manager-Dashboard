import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleDashboardSelect = (type) => {
    setDropdown(false);
    navigate(`/${type}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CREDIT APP</div>
      <ul className="navbar-menu">
        <li><Link to="/">🏠 Home</Link></li>
        <li><Link to="#">📈 Payments</Link></li>
        <li><Link to="#">📘 Budget</Link></li>
        <li><Link to="#">💳 Card</Link></li>
      </ul>
      <div className="navbar-profile">
        {user ? <span>Hi, {user.name} 👋</span> : <Link to="/login"><button>Login</button></Link>}
        {user && (
          <div className="profile-dropdown" onClick={() => setDropdown(!dropdown)}>
            👤 {user.role} ▾
            {dropdown && (
              <div className="dropdown-menu">
                <div onClick={() => handleDashboardSelect(user.role)}>Dashboard</div>
                <div onClick={() => { logout(); navigate('/'); }}>Logout</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

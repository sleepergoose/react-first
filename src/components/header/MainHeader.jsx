import './MainHeader.css';
import authService from '../../services/auth.service.js';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from '../../assets/react.svg';
import UserAvatar from '../../assets/user-avatar.svg';

const MainHeader = () => {
  const navigate = useNavigate();
  const [profileMenuState, setProfileMenuState] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogOutClick = async () => {
    await authService.logOut();
    navigate('/login');
  };

  const handleProfileMenuClick = (e) => {
    setProfileMenuState(!profileMenuState);
    e.preventDefault();
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="main-header">
      <div className="navigator">
        <Link className="logo" to="/">
          <img src={Logo} alt="react-icon" />
          First React App
        </Link>
      </div>
      <div className="profile-menu">
        <button className="profile-menu-btn" onClick={handleProfileMenuClick}>
          {user && (
            <div className="user-data">
              <span className="name">{user.name}</span>
              <span className="email">{user.email}</span>
            </div>
          )}
          <img className="avatar" src={UserAvatar} alt="avatar" />
          {profileMenuState && (
            <ul className="menu">
              <li onClick={handleProfileClick}>Profile</li>
              <li onClick={handleLogOutClick}>Log Out</li>
            </ul>
          )}
        </button>
      </div>
    </div>
  );
};

export default MainHeader;

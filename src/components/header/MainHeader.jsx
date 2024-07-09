import './MainHeader.css';
import AuthService from '../../services/auth.service.jsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MainHeader = () => {
  const authService = new AuthService();
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
        <div className="logo">
          <img src="src/assets/react.svg" alt="react-icon" />
          First React App
        </div>
      </div>
      <div className="profile-menu">
        <button className="profile-menu-btn" onClick={handleProfileMenuClick}>
          {user && (
            <div className="user-data">
              <span className="name">{user.name}</span>
              <span className="email">{user.email}</span>
            </div>
          )}
          <img
            className="avatar"
            src="src/assets/user-avatar.svg"
            alt="avatar"
          />
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

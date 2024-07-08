import './MainHeader.css';
import AuthService from '../../services/auth.service.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MainHeader = () => {
  const navigate = useNavigate();
  const [profileMenuState, setProfileMenuState] = useState(false);

  const handleLogOutClick = async () => {
    const authService = new AuthService();
    await authService.logOut();
    navigate('/login');
  };

  const handleProfileMenuClick = (e) => {
    setProfileMenuState(!profileMenuState);
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
        <button className="avatar" onClick={handleProfileMenuClick}>
          <img src="src/assets/user-avatar.svg" alt="avatar" />
          {profileMenuState && (
            <ul className="menu hidden" id="profileDropdown">
              <li>Profile</li>
              <li onClick={handleLogOutClick}>Log Out</li>
            </ul>
          )}
        </button>
      </div>
    </div>
  );
};

export default MainHeader;

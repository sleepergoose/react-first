import './MainHeader.css';
import AuthService from '../../services/auth.service.jsx';
import { useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogOutClick = async () => {
    const authService = new AuthService();
    await authService.logOut();
    navigate('/login');
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
        <button className="avatar">
          <img src="src/assets/user-avatar.svg" alt="" />
          <ul className="menu">
            <li>Profile</li>
            <li onClick={handleLogOutClick}>Log Out</li>
          </ul>
        </button>
      </div>
    </div>
  );
};

export default MainHeader;

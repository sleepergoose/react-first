import './MainHeader.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/react.svg';
import UserAvatar from '../../assets/user-avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { logoutRequestAction } from '../../store/slices/logout.slice.js';

const MainHeader = () => {
  const [profileMenuState, setProfileMenuState] = useState(false);
  const { user } = useSelector(store => store?.auth?.auth);
  const { isPending } = useSelector(store => store?.logout?.logout);
  const dispatch = useDispatch();

  const handleLogOutClick = async () => {
    dispatch(logoutRequestAction());
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
              <li className={isPending ? 'disabled-item' : ''} onClick={handleLogOutClick}>Log Out</li>
            </ul>
          )}
        </button>
      </div>
    </div>
  );
};

export default MainHeader;

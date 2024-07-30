import './Sidebar.css';
import ManuWhiteIcon from '../../assets/menu-white.svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListOutlined from '@mui/icons-material/ListOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { useLocation } from 'react-router-dom';
import MenuItemlink from '../manu-item-link/MenuItemLink';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const authState = useSelector((store) => store?.auth);

  const location = useLocation();

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={ManuWhiteIcon} alt="menu-icon" />
          <span>Menu</span>
        </div>
        <ul className="menu-list">
          <MenuItemlink link={'/'} pathname={location.pathname}>
            <HomeOutlinedIcon />
            Home
          </MenuItemlink>
          <MenuItemlink link={'/products'} pathname={location.pathname}>
            <ListOutlined />
            Product List
          </MenuItemlink>
          {authState?.user?.role === 'admin' && (
            <MenuItemlink link={'/products/add'} pathname={location.pathname}>
              <NoteAddOutlinedIcon />
              Add Product
            </MenuItemlink>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

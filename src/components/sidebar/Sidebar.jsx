import './Sidebar.css';
import ManuWhiteIcon from '../../assets/menu-white.svg';
import ListIcon from '../../assets/list.svg';
import AddIcon from '../../assets/add.svg';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={ManuWhiteIcon} alt="menu-icon" />
          <span>Menu</span>
        </div>
        <ul className="menu-list">
          <li>
            <HomeOutlinedIcon />
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <img src={ListIcon} alt="list icon" />
            <Link to={'/products'}>Product List</Link>
          </li>
          <li>
            <img src={AddIcon} alt="add icon" />
            <Link to={'/products/add'}>Add product</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

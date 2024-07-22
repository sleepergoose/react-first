import './MenuItemLink.css';
import { Link } from 'react-router-dom';

const MenuItemLink = ({ link, pathname, children }) => {
  return (
    <li className={link === pathname ? 'menu-item active' : 'menu-item'}>
      <Link to={link} className="link">
        {children}
      </Link>
    </li>
  );
};

export default MenuItemLink;

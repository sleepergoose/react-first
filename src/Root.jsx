import './Root.css';
import { Outlet } from 'react-router-dom';
import MainHeader from './components/header/MainHeader.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';

const Root = () => {
  return (
    <>
      <MainHeader />
      <div className="main-content">
        <Sidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;

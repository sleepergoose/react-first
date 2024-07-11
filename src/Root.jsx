import './Root.css';
import { Outlet } from 'react-router-dom';
import MainHeader from './components/header/MainHeader.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';

const Root = () => {
  return (
    <>
      <MainHeader />
      <div className="content">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Root;

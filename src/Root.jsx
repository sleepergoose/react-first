import { Outlet } from 'react-router-dom';
import MainHeader from './components/header/MainHeader.jsx';

const Root = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default Root;

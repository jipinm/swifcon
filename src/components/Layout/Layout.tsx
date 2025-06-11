import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import GetInTouch from '../GetInTouch/GetInTouch';
import Partners from '../Partners/Partners';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main style={{ position: 'relative' }}>
        <Outlet />
      </main>
      <GetInTouch />
      <Partners />
      <Footer />
    </div>
  );
};

export default Layout;

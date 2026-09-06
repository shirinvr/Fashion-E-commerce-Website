import SideBar from '../SideBar/SideBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import './Landingpage.css';

const Landing = () => {
    return (
        <div className="landing">
            <Header />

            <div className="row px-0 mx-0">
                <div className="col-md-2 px-0 sidebar">
                    <SideBar />
                </div>

                <div className="col-md-10 Grid">
                    <Outlet />
                </div>
            </div>

            <Footer />
        </div>
    );
}
export default Landing;
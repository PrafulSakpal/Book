import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <div className="container-fluid">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

import { FC, useEffect } from "react";
import "./default-layout.sass";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./header";
import Aside from "./aside";

const DefaultLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/houses");
    }
  }, []);

  return (
    <div className="default-layout">
      <Header />
      <Aside />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;

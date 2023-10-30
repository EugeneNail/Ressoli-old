import { FC, useEffect } from "react";
import "./default-layout.sass";
import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./header";
import Aside from "./aside";
import api from "../../service/api";

const DefaultLayout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authenticate = async () => {
    console.log("ye");
    if ((await api.post("/authenticate")).status === 401) {
      navigate("/login");
    }
  };
  useEffect(() => {
    authenticate();
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

import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import "./guest-layout.sass";
import api from "../../service/api";

const GuestLayout: FC = () => {
  const navigate = useNavigate();

  const redirectIfLogged = async () => {
    if ((await api.post("/authenticate")).status === 204) {
      navigate("/");
    }
  };

  useEffect(() => {
    redirectIfLogged();
  }, []);

  return (
    <div className="guest-layout">
      <Outlet />
    </div>
  );
};

export default GuestLayout;

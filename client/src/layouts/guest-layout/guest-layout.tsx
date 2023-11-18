import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import "./guest-layout.sass";
import api from "../../service/api";

function GuestLayout() {
  const navigate = useNavigate();

  async function redirectIfLogged() {
    if ((await api.post("/authenticate")).status === 204) {
      navigate("/");
    }
  }

  useEffect(() => {
    redirectIfLogged();
  }, []);

  return (
    <div className="guest-layout">
      <Outlet />
    </div>
  );
}

export default GuestLayout;

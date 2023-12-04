import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import "./guest-layout.sass";
import api from "../../service/api";

function GuestLayout() {
  return (
    <div className="guest-layout">
      <Outlet />
    </div>
  );
}

export default GuestLayout;

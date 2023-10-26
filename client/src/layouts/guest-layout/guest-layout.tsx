import { FC } from "react";
import { Outlet } from "react-router";
import "./guest-layout.sass";

const GuestLayout: FC = () => {
  return (
    <div className="guest-layout">
      <Outlet />
    </div>
  );
};

export default GuestLayout;

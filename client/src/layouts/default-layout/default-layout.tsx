import { FC } from "react";
import "./default-layout.sass";
import { Outlet } from "react-router";
import Aside from "./aside";

const DefaultLayout: FC = () => {
  return (
    <div className="default-layout">
      <Aside />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;

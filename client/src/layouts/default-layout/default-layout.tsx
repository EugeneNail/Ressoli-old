import "./default-layout.sass";
import { Outlet } from "react-router";
import Aside from "./aside";

function DefaultLayout() {
  return (
    <div className="default-layout">
      <Aside />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;

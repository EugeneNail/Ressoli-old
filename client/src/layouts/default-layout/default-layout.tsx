import "./default-layout.sass";
import { Outlet } from "react-router";
import { Menu } from "../../components/menu/menu";

function DefaultLayout() {
  return (
    <div className="default-layout">
      <Menu />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;

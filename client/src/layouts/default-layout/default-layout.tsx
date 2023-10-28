import { FC } from "react";
import "./default-layout.sass";
import { Outlet } from "react-router";
import Header from "./header";

const DefaultLayout: FC = () => {
  return (
    <div className="default-layout">
      <Header />
      <aside className="aside"></aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;

import { FC, useEffect } from "react";
import "./default-layout.sass";
import { Outlet } from "react-router";
import Header from "./header";
import Aside from "./aside";
import api from "../../service/api";

const DefaultLayout: FC = () => {
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

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import RootRouter from "./root-router";
import { YMaps } from "@pbe/react-yandex-maps";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);

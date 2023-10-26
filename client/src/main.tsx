import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import { RouterProvider } from "react-router";
import rootRouter from "./root-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={rootRouter} />
  </React.StrictMode>
);

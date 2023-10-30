import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/guest/login-page";
import GuestLayout from "./layouts/guest-layout/guest-layout";
import SignupPage from "./pages/guest/signup-page";
import DefaultLayout from "./layouts/default-layout/default-layout";
import RootRouter from "./root-router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
